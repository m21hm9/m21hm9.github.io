const studyLabels = [
  "Molecular structures & representations",
  "A question, a search, a synthesis",
  "Patterns & unusual observations",
  "Meaning through reconstruction",
];

/** Concept illustrations, not experimental results or product screenshots. */
export function ProjectArtwork({ index }: { index: number }) {
  return (
    <svg
      viewBox="0 0 600 360"
      fill="none"
      className={`project-artwork study-${index}`}
      aria-hidden="true"
    >
      <path
        d="M28 28h20M28 28v20M572 28h-20M572 28v20M28 332h20M28 332v-20M572 332h-20M572 332v-20"
        stroke="currentColor"
        strokeWidth=".7"
        opacity=".24"
      />
      {index === 0 && (
        <>
          <g stroke="currentColor" strokeWidth="1.2" opacity=".65">
            <path d="M176 118 230 87 284 118v63l-54 31-54-31zM284 118l54-31 54 31v63l-54 31-54-31M176 181l-54 31-42-24M230 87V42M392 181l54 31 51-30M338 212v59l51 29" />
            <path
              d="m185 125 45-26 45 26M275 175l-45 26-45-26M293 125l45-26 45 26M383 175l-45 26"
              opacity=".4"
            />
          </g>
          <g fill="currentColor">
            {[
              [176, 118],
              [230, 87],
              [284, 118],
              [176, 181],
              [230, 212],
              [284, 181],
              [338, 87],
              [392, 118],
              [392, 181],
              [338, 212],
              [122, 212],
              [446, 212],
              [338, 271],
            ].map(([x, y], i) => (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={i % 3 === 0 ? 5 : 3}
                opacity={i % 3 === 0 ? 0.85 : 0.45}
              />
            ))}
          </g>
          <circle
            cx="300"
            cy="177"
            r="132"
            stroke="currentColor"
            strokeDasharray="1 8"
            opacity=".25"
          />
          <ellipse
            cx="300"
            cy="177"
            rx="218"
            ry="108"
            transform="rotate(-18 300 177)"
            stroke="currentColor"
            strokeWidth=".65"
            opacity=".25"
          />
          <circle cx="497" cy="182" r="13" stroke="currentColor" opacity=".5" />
          <circle cx="230" cy="42" r="9" stroke="currentColor" opacity=".5" />
        </>
      )}
      {index === 1 && (
        <>
          <g stroke="currentColor" strokeWidth=".9" opacity=".42">
            {[-80, -40, 0, 40, 80].map((offset) => (
              <path
                key={offset}
                d={`M83 180 C180 180 165 ${180 + offset} 245 ${180 + offset} S355 180 410 180 S475 180 518 180`}
              />
            ))}
            <path
              d="M246 100C370 20 452 73 410 180M246 260c124 80 206 27 164-80"
              strokeDasharray="3 6"
            />
          </g>
          <circle cx="83" cy="180" r="20" fill="currentColor" opacity=".07" />
          <circle cx="83" cy="180" r="5" fill="currentColor" />
          {[100, 140, 180, 220, 260].map((y) => (
            <g key={y}>
              <circle cx="246" cy={y} r="7" fill="currentColor" opacity=".7" />
              <circle
                cx="246"
                cy={y}
                r="15"
                stroke="currentColor"
                opacity=".2"
              />
            </g>
          ))}
          <circle cx="410" cy="180" r="35" stroke="currentColor" opacity=".6" />
          <circle
            cx="410"
            cy="180"
            r="26"
            stroke="currentColor"
            strokeDasharray="1 5"
            opacity=".5"
          />
          <circle cx="410" cy="180" r="4" fill="currentColor" />
          <path
            d="M508 163h20v34h-20zM513 172h10M513 178h10M513 184h6"
            stroke="currentColor"
            strokeWidth="1"
            opacity=".7"
          />
          <g
            fill="currentColor"
            fontFamily="Georgia, serif"
            fontSize="13"
            opacity=".7"
          >
            <text x="56" y="230">
              question
            </text>
            <text x="226" y="306">
              search
            </text>
            <text x="392" y="244">
              reflect
            </text>
            <text x="502" y="230">
              report
            </text>
          </g>
        </>
      )}
      {index === 2 && (
        <>
          <g stroke="currentColor" strokeWidth=".6" opacity=".12">
            {[90, 150, 210, 270].map((y) => (
              <path key={y} d={`M65 ${y}h470`} />
            ))}
          </g>
          <path
            d="M65 275h470M65 70v205"
            stroke="currentColor"
            strokeWidth=".8"
            opacity=".4"
          />
          <path
            d="M65 198C85 198 85 176 105 176S125 216 145 216s20-40 40-40 20 25 40 25 20-13 40-13 15 10 30 10 16-118 32-118 10 125 30 125 15-25 35-25 20 28 40 28 20-40 40-40 20 20 40 20 22-5 38-5"
            data-signal-path
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M65 198C85 198 85 176 105 176S125 216 145 216s20-40 40-40 20 25 40 25 20-13 40-13 15 10 30 10 16-118 32-118 10 125 30 125 15-25 35-25 20 28 40 28 20-40 40-40 20 20 40 20 22-5 38-5v92H65z"
            fill="currentColor"
            opacity=".035"
          />
          <circle cx="327" cy="80" r="5" fill="currentColor" />
          <circle cx="327" cy="80" r="15" stroke="currentColor" opacity=".35" />
          <path
            d="M327 102v170"
            stroke="currentColor"
            strokeDasharray="3 5"
            opacity=".3"
          />
          <text
            x="352"
            y="84"
            fill="currentColor"
            fontFamily="Georgia, serif"
            fontStyle="italic"
            fontSize="14"
          >
            an unusual observation
          </text>
          <text
            x="65"
            y="305"
            fill="currentColor"
            fontFamily="Georgia, serif"
            fontSize="12"
            opacity=".6"
          >
            Illustrative signal
          </text>
        </>
      )}
      {index === 3 && (
        <>
          <g stroke="currentColor" strokeWidth=".8" opacity=".4">
            {Array.from({ length: 9 }, (_, i) => (
              <path
                key={i}
                d={`M85 ${80 + i * 25}C170 ${80 + i * 25} 220 180 278 180S430 ${80 + i * 25} 515 ${80 + i * 25}`}
              />
            ))}
          </g>
          <rect
            x="271"
            y="136"
            width="58"
            height="88"
            rx="29"
            fill="currentColor"
            opacity=".08"
          />
          <rect
            x="271"
            y="136"
            width="58"
            height="88"
            rx="29"
            stroke="currentColor"
            opacity=".7"
          />
          {[158, 180, 202].map((y) => (
            <circle
              key={y}
              cx="300"
              cy={y}
              r="3"
              fill="currentColor"
              opacity=".7"
            />
          ))}
          <path
            d="M85 65v230M515 65v230"
            stroke="currentColor"
            strokeWidth=".7"
            opacity=".3"
          />
          <ellipse
            cx="300"
            cy="180"
            rx="117"
            ry="111"
            stroke="currentColor"
            strokeWidth=".6"
            strokeDasharray="1 7"
            opacity=".3"
          />
          <g
            fill="currentColor"
            fontFamily="Georgia, serif"
            fontSize="13"
            opacity=".7"
          >
            <text x="66" y="326">
              encode
            </text>
            <text x="280" y="261">
              anchor
            </text>
            <text x="475" y="326">
              reconstruct
            </text>
          </g>
        </>
      )}
    </svg>
  );
}

export function StudyCaption({ index }: { index: number }) {
  return (
    <figcaption className="mt-3 flex flex-wrap justify-between gap-2 text-[10px] leading-relaxed text-muted-foreground">
      <span>Concept study / 0{index + 1}</span>
      <span>{studyLabels[index]}</span>
    </figcaption>
  );
}
