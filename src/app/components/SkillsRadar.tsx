import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const skillsData = [
  { skill: 'UI Design', value: 95 },
  { skill: 'UX Research', value: 85 },
  { skill: 'React', value: 90 },
  { skill: 'TypeScript', value: 85 },
  { skill: 'Figma', value: 95 },
  { skill: 'Leadership', value: 80 },
];

export function SkillsRadar() {
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={skillsData}>
          <PolarGrid stroke="#FF7A00" strokeOpacity={0.2} />
          <PolarAngleAxis 
            dataKey="skill" 
            tick={{ fill: '#888', fontSize: 12 }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]}
            tick={{ fill: '#888' }}
          />
          <Radar
            name="Skills"
            dataKey="value"
            stroke="#FF7A00"
            fill="#FF7A00"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
