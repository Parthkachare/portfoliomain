// Custom Scrollbar Styles
export function CustomScrollbar() {
  return (
    <style>{`
      /* Custom Scrollbar */
      ::-webkit-scrollbar {
        width: 12px;
        height: 12px;
      }

      ::-webkit-scrollbar-track {
        background: transparent;
      }

      ::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, #FF7A00, #FEB273);
        border-radius: 6px;
        border: 2px solid transparent;
        background-clip: padding-box;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(180deg, #FEB273, #FF7A00);
        border-radius: 6px;
        border: 2px solid transparent;
        background-clip: padding-box;
      }

      /* Firefox */
      * {
        scrollbar-width: thin;
        scrollbar-color: #FF7A00 transparent;
      }

      /* Selection Color */
      ::selection {
        background-color: #FF7A00;
        color: white;
      }

      ::-moz-selection {
        background-color: #FF7A00;
        color: white;
      }
    `}</style>
  );
}
