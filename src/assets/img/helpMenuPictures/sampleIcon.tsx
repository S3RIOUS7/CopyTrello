
const SampleTrelloIcon = ({
  width = 186,
  height = 103,
  primaryColor = "#E3E3E3",
  secondaryColor = "white",
  accentColor = "#E4E4E4",
  lightColor = "#F1F1F1",
  className = ""
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 186 103"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Trello illustration"
    >
      {/* Left card */}
      <rect x="64.4185" y="14.3774" width="57.8728" height="54.8552" rx="1.31379" fill={primaryColor}/>
      <rect x="67.9799" y="27.5364" width="51.0468" height="12.574" rx="1.31379" fill={secondaryColor}/>
      <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="67" y="27" width="53" height="14">
        <rect x="67.9799" y="27.5364" width="51.0468" height="12.574" rx="1.31379" fill={secondaryColor}/>
      </mask>
      <g mask="url(#mask0)">
        <path fillRule="evenodd" clipRule="evenodd" d="M70.651 32.5795C70.651 32.2167 70.9451 31.9226 71.3079 31.9226H80.3815C80.7443 31.9226 81.0384 32.2167 81.0384 32.5795V35.0672C81.0384 35.43 80.7443 35.7241 80.3815 35.7241H71.3079C70.9451 35.7241 70.651 35.43 70.651 35.0672V32.5795Z" fill={accentColor}/>
      </g>
      <rect x="67.9799" y="43.0345" width="51.0468" height="22.8087" rx="1.31379" fill={secondaryColor}/>
      <mask id="mask1" mask-type="alpha" maskUnits="userSpaceOnUse" x="67" y="43" width="53" height="23">
        <rect x="67.9799" y="43.0345" width="51.0468" height="22.8087" rx="1.31379" fill={secondaryColor}/>
      </mask>
      <g mask="url(#mask1)">
        <rect x="70.651" y="47.4208" width="38.5819" height="3.80145" rx="0.656896" fill={accentColor}/>
        <rect x="70.651" y="54.1465" width="14.2456" height="3.80145" rx="0.656896" fill={accentColor}/>
      </g>
      <path fillRule="evenodd" clipRule="evenodd" d="M68.2767 20.0055C68.2767 19.6427 68.5708 19.3486 68.9336 19.3486H90.7689C91.1317 19.3486 91.4258 19.6427 91.4258 20.0055V23.078C91.4258 23.4408 91.1317 23.7349 90.7689 23.7349H68.9336C68.5708 23.7349 68.2767 23.4408 68.2767 23.078V20.0055Z" fill={secondaryColor}/>

      {/* Right card */}
      <rect x="127.93" y="14.3774" width="57.8728" height="84.2168" rx="1.31379" fill={primaryColor}/>
      <rect x="131.492" y="27.8287" width="51.0468" height="35.3827" rx="1.31379" fill={secondaryColor}/>
      <mask id="mask2" mask-type="alpha" maskUnits="userSpaceOnUse" x="131" y="27" width="52" height="37">
        <rect x="131.492" y="27.8287" width="51.0468" height="35.3827" rx="1.31379" fill={secondaryColor}/>
      </mask>
      <g mask="url(#mask2)">
        <rect x="131.51" y="26.6929" width="55.3861" height="27.0612" fill={lightColor}/>
        <path fillRule="evenodd" clipRule="evenodd" d="M134.163 57.1427C134.163 56.7799 134.457 56.4858 134.82 56.4858H145.674C146.037 56.4858 146.331 56.7799 146.331 57.1427V59.6304C146.331 59.9932 146.037 60.2873 145.674 60.2873H134.82C134.457 60.2873 134.163 59.9932 134.163 59.6304V57.1427Z" fill={accentColor}/>
      </g>
      <rect x="131.195" y="67.0129" width="51.0468" height="11.4044" rx="1.31379" fill={secondaryColor}/>
      <mask id="mask3" mask-type="alpha" maskUnits="userSpaceOnUse" x="131" y="67" width="52" height="12">
        <rect x="131.195" y="67.0129" width="51.0468" height="11.4044" rx="1.31379" fill={secondaryColor}/>
      </mask>
      <rect x="133.866" y="70.8143" width="19.2909" height="3.80145" rx="0.656896" fill={accentColor}/>
      <rect x="131.195" y="81.9263" width="51.0468" height="11.4044" rx="1.31379" fill={secondaryColor}/>
      <mask id="mask4" mask-type="alpha" maskUnits="userSpaceOnUse" x="131" y="81" width="52" height="13">
        <rect x="131.195" y="81.9263" width="51.0468" height="11.4044" rx="1.31379" fill={secondaryColor}/>
      </mask>
      <rect x="133.866" y="85.7277" width="13.3553" height="3.80145" rx="0.656896" fill={accentColor}/>
      <path fillRule="evenodd" clipRule="evenodd" d="M131.788 20.0055C131.788 19.6427 132.082 19.3486 132.445 19.3486H146.267C146.63 19.3486 146.924 19.6427 146.924 20.0055V23.078C146.924 23.4408 146.63 23.7349 146.267 23.7349H132.445C132.082 23.7349 131.788 23.4408 131.788 23.078V20.0055Z" fill={secondaryColor}/>

      {/* Bottom card */}
      <rect x="0.90686" y="14.3774" width="57.8728" height="85.9713" rx="1.31379" fill={primaryColor}/>
      <rect x="4.46826" y="27.8287" width="51.0468" height="12.2816" rx="1.31379" fill={secondaryColor}/>
      <rect x="7.13928" y="31.9226" width="25.8202" height="3.80145" rx="0.656896" fill={accentColor}/>
      <rect x="4.46826" y="43.9119" width="51.0468" height="12.2816" rx="1.31379" fill={secondaryColor}/>
      <rect x="7.13928" y="48.0057" width="19.5877" height="3.80145" rx="0.656896" fill={accentColor}/>
      <rect x="6.84247" y="87.7747" width="13.3553" height="3.80145" rx="0.656896" fill={accentColor}/>
      <rect x="4.39703" y="59.6907" width="51.0468" height="35.3827" rx="1.31379" fill={secondaryColor}/>
      <mask id="mask5" mask-type="alpha" maskUnits="userSpaceOnUse" x="4" y="59" width="52" height="37">
        <rect x="4.39703" y="59.6907" width="51.0468" height="35.3827" rx="1.31379" fill={secondaryColor}/>
      </mask>
      <g mask="url(#mask5)">
        <rect x="4.41547" y="58.5548" width="55.3861" height="27.0612" fill={lightColor}/>
        <rect x="7.06805" y="88.3478" width="12.1681" height="3.80145" rx="0.656896" fill={accentColor}/>
      </g>
      <rect x="4.76501" y="19.3486" width="14.2456" height="4.38629" rx="0.656896" fill={secondaryColor}/>

      {/* Trello logo */}
      <path fillRule="evenodd" clipRule="evenodd" d="M89.5882 0.101685C88.8344 0.101685 88.2234 0.709591 88.2234 1.45876V9.60063C88.2234 10.3501 88.8347 10.9577 89.5882 10.9577H97.7762C98.53 10.9577 99.141 10.3498 99.141 9.60063V1.45876C99.141 0.709269 98.5297 0.101685 97.7762 0.101685H89.5882ZM95.0468 1.51297C94.6851 1.51297 94.3919 1.80458 94.3919 2.16464V5.63796C94.3919 5.99787 94.6852 6.28962 95.0468 6.28962H97.0669C97.4285 6.28962 97.7218 5.99801 97.7218 5.63796V2.16464C97.7218 1.80473 97.4284 1.51297 97.0669 1.51297H95.0468ZM90.2976 1.51297C89.9359 1.51297 89.6427 1.80432 89.6427 2.16462V8.35199C89.6427 8.71188 89.936 9.00363 90.2976 9.00363H92.3177C92.6794 9.00363 92.9726 8.71229 92.9726 8.35199V2.16462C92.9726 1.80473 92.6793 1.51297 92.3177 1.51297H90.2976Z" fill={secondaryColor}/>
    </svg>
  );
};

export default SampleTrelloIcon;