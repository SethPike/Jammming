export default function RingText({ children }) {
  return (
    <svg
      viewBox="-140 0 920 200"
      style={{ display: 'block', margin: '0 auto', width: '300px', height: '100px' }}
      xmlns="http://www.w3.org/2000/svg">
      <text x="310" y="140" textAnchor="middle"
        fontFamily="Playfair Display, Georgia, serif"
        fontSize="130" fontWeight="700"
        fill="none" stroke="#000" strokeWidth="72">{children}</text>

      <text x="310" y="140" textAnchor="middle"
        fontFamily="Playfair Display, Georgia, serif"
        fontSize="130" fontWeight="700"
        fill="none" stroke="#3d6fff" strokeWidth="62">{children}</text>

      <text x="310" y="140" textAnchor="middle"
        fontFamily="Playfair Display, Georgia, serif"
        fontSize="130" fontWeight="700"
        fill="none" stroke="#000" strokeWidth="50">{children}</text>

      <text x="310" y="140" textAnchor="middle"
        fontFamily="Playfair Display, Georgia, serif"
        fontSize="130" fontWeight="700"
        fill="none" stroke="#00e5cc" strokeWidth="40">{children}</text>

      <text x="310" y="140" textAnchor="middle"
        fontFamily="Playfair Display, Georgia, serif"
        fontSize="130" fontWeight="700"
        fill="none" stroke="#000" strokeWidth="28">{children}</text>

      <text x="310" y="140" textAnchor="middle"
        fontFamily="Playfair Display, Georgia, serif"
        fontSize="130" fontWeight="700"
        fill="#aaff00">{children}</text>
    </svg>
  );
}