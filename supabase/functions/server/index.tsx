import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "npm:@supabase/supabase-js";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-15ed28e0/health", (c) => {
  return c.json({ status: "ok" });
});

// Contact form submission endpoint
app.post("/make-server-15ed28e0/contact", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return c.json({ error: "All fields are required" }, 400);
    }

    // Create a unique key for this submission
    const timestamp = Date.now();
    const key = `contact_${timestamp}`;

    // Store in key-value store
    const contactData = {
      name,
      email,
      message,
      timestamp,
      date: new Date().toISOString(),
    };

    await kv.set(key, contactData);

    return c.json({
      success: true,
      message: "Contact form submitted successfully!",
      id: key
    });
  } catch (error: any) {
    return c.json({
      error: "Failed to save contact form submission",
      details: "Server temporarily unavailable"
    }, 500);
  }
});

// Get all contact form submissions (for admin use)
app.get("/make-server-15ed28e0/contacts", async (c) => {
  try {
    const contacts = await kv.getByPrefix('contact_');

    // Sort by timestamp (newest first)
    const sortedContacts = contacts.sort((a: any, b: any) => {
      return (b.value?.timestamp || 0) - (a.value?.timestamp || 0);
    });

    return c.json({
      success: true,
      count: sortedContacts.length,
      contacts: sortedContacts
    });
  } catch (error: any) {
    return c.json({
      error: "Failed to fetch contact submissions",
      details: "Server temporarily unavailable"
    }, 500);
  }
});

// Submit typing challenge score to leaderboard
app.post("/make-server-15ed28e0/leaderboard", async (c) => {
  try {
    const body = await c.req.json();
    const { name, time, accuracy, snippet, timestamp } = body;

    // Validate input
    if (!name || time === undefined || accuracy === undefined) {
      return c.json({ error: "Name, time, and accuracy are required" }, 400);
    }

    // Create a unique key for this entry
    const key = `leaderboard_${timestamp || Date.now()}`;

    // Store in key-value store
    const leaderboardEntry = {
      name,
      time,
      accuracy,
      snippet,
      timestamp: timestamp || Date.now(),
      date: new Date().toISOString(),
    };

    await kv.set(key, leaderboardEntry);

    return c.json({
      success: true,
      message: "Score submitted successfully!",
      id: key
    });
  } catch (error: any) {
    return c.json({
      error: "Failed to save leaderboard entry",
      details: "Server temporarily unavailable"
    }, 500);
  }
});

// Get leaderboard (top scores)
app.get("/make-server-15ed28e0/leaderboard", async (c) => {
  try {
    const entries = await kv.getByPrefix('leaderboard_');

    // Sort by time (fastest first), then by accuracy as tiebreaker
    const sortedEntries = entries
      .filter((entry: any) => {
        return entry && entry.name && entry.time !== undefined;
      })
      .sort((a: any, b: any) => {
        if (a.time === b.time) {
          return (b.accuracy || 0) - (a.accuracy || 0);
        }
        return (a.time || Infinity) - (b.time || Infinity);
      })
      .slice(0, 10); // Top 10 only

    return c.json({
      success: true,
      count: sortedEntries.length,
      leaderboard: sortedEntries
    });
  } catch (error: any) {
    // Server or database error - return error response without verbose logging
    return c.json({
      error: "Failed to fetch leaderboard",
      details: "Server temporarily unavailable"
    }, 500);
  }
});

// Clear leaderboard (delete all entries)
app.delete("/make-server-15ed28e0/leaderboard", async (c) => {
  try {
    // Get all leaderboard entries first
    const allEntries = await kv.getByPrefix('leaderboard_');
    
    // Get all the keys by querying the database directly
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL'),
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'),
    );
    
    const { data, error } = await supabase
      .from('kv_store_15ed28e0')
      .select('key')
      .like('key', 'leaderboard_%');
    
    if (error) {
      throw new Error(error.message);
    }
    
    if (data && data.length > 0) {
      const keys = data.map(row => row.key);
      await kv.mdel(keys);

      return c.json({
        success: true,
        message: `Cleared ${keys.length} leaderboard entries`,
        deletedCount: keys.length
      });
    }

    return c.json({
      success: true,
      message: 'No leaderboard entries to clear',
      deletedCount: 0
    });
  } catch (error: any) {
    return c.json({
      error: "Failed to clear leaderboard",
      details: "Server temporarily unavailable"
    }, 500);
  }
});

// Submit reward claim
app.post("/make-server-15ed28e0/reward-claim", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, company, service, timestamp } = body;

    // Validate input
    if (!name || !email || !service) {
      return c.json({ error: "Name, email, and service are required" }, 400);
    }

    // Create a unique key for this claim
    const key = `reward_claim_${timestamp || Date.now()}`;

    // Store in key-value store
    const claimData = {
      name,
      email,
      company,
      service,
      timestamp: timestamp || Date.now(),
      date: new Date().toISOString(),
    };

    await kv.set(key, claimData);

    return c.json({
      success: true,
      message: "Reward claim submitted successfully!",
      id: key
    });
  } catch (error: any) {
    return c.json({
      error: "Failed to save reward claim",
      details: "Server temporarily unavailable"
    }, 500);
  }
});

// Submit escape room score and calculate rank
app.post("/make-server-15ed28e0/escape-scores", async (c) => {
  try {
    const body = await c.req.json();
    const { sessionId, score, time, timestamp } = body;

    // Validate input
    if (!sessionId || score === undefined || time === undefined) {
      return c.json({ error: "Session ID, score, and time are required" }, 400);
    }

    // Create a unique key for this score
    const key = `escape_score_${sessionId}`;

    // Store in key-value store
    const scoreData = {
      sessionId,
      score,
      time,
      timestamp: timestamp || Date.now(),
      date: new Date().toISOString(),
    };

    await kv.set(key, scoreData);

    // Get all escape room scores to calculate rank
    const allScores = await kv.getByPrefix('escape_score_');
    
    // Sort scores: higher score first, then faster time as tiebreaker
    const sortedScores = allScores.sort((a: any, b: any) => {
      if (b.score === a.score) {
        return a.time - b.time; // Lower time is better
      }
      return b.score - a.score; // Higher score is better
    });

    // Find rank (1-indexed)
    const rank = sortedScores.findIndex((entry: any) => entry.sessionId === sessionId) + 1;

    return c.json({
      success: true,
      message: "Score submitted successfully!",
      rank,
      totalPlayers: sortedScores.length,
      id: key
    });
  } catch (error: any) {
    return c.json({
      error: "Failed to save escape room score",
      details: "Server temporarily unavailable"
    }, 500);
  }
});

// Get escape room leaderboard
app.get("/make-server-15ed28e0/escape-scores", async (c) => {
  try {
    const allScores = await kv.getByPrefix('escape_score_');

    // Sort scores: higher score first, then faster time as tiebreaker
    const sortedScores = allScores
      .sort((a: any, b: any) => {
        if (b.score === a.score) {
          return a.time - b.time; // Lower time is better
        }
        return b.score - a.score; // Higher score is better
      })
      .slice(0, 50); // Top 50 scores

    return c.json({
      success: true,
      count: sortedScores.length,
      leaderboard: sortedScores
    });
  } catch (error: any) {
    return c.json({
      error: "Failed to fetch escape room leaderboard",
      details: "Server temporarily unavailable"
    }, 500);
  }
});

// Get visitor count
app.get("/make-server-15ed28e0/visitor-count", async (c) => {
  try {
    const countData = await kv.get('portfolio_visitor_count');
    const count = countData || 0;

    return c.json({
      success: true,
      count: count
    });
  } catch (error: any) {
    return c.json({
      error: "Failed to fetch visitor count",
      details: "Server temporarily unavailable"
    }, 500);
  }
});

// Increment visitor count
app.post("/make-server-15ed28e0/visitor-count", async (c) => {
  try {
    // Get current count
    const currentCount = await kv.get('portfolio_visitor_count') || 0;

    // Increment count
    const newCount = currentCount + 1;

    // Save new count
    await kv.set('portfolio_visitor_count', newCount);

    return c.json({
      success: true,
      count: newCount
    });
  } catch (error: any) {
    return c.json({
      error: "Failed to increment visitor count",
      details: "Server temporarily unavailable"
    }, 500);
  }
});

Deno.serve(app.fetch);