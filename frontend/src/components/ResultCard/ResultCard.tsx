import React, { useState } from 'react';
import './ResultCard.css';
import SummarizeIcon from '@mui/icons-material/Summarize';

type Props = {
  analysis: {
    summary?: string;
    explanation?: string;
    suggestions?: string;
    improvedCode?: string;
  };
};

const ResultCard = ({ analysis }: Props) => {
  const [active, setActive] = useState(false);

  return (
 <div
  className={`card ${
    analysis.summary
      ? 'summary-card'
      : analysis.explanation
      ? 'explanation-card'
      : analysis.suggestions
      ? 'suggestions-card'
      : ''
  }`}
  onMouseEnter={() => setActive(true)}
  onMouseLeave={() => setActive(false)}
  style={{
    width: analysis.suggestions ? '86vw' : '40vw'
  }}
>


      <div className="light-layer">
        <div className="slit"></div>
        <div className="lumen">
          <div className="min"></div>
          <div className="mid"></div>
          <div className="hi"></div>
        </div>
        <div className="darken">
          <div className="sl"></div>
          <div className="ll"></div>
          <div className="slt"></div>
          <div className="srt"></div>
        </div>
      </div>
      <div className="content">
         <div className="icon">

       {analysis?.summary &&  <span className="google-icon material-icons-round">assignment</span>}
          {analysis?.explanation && <span className="google-icon  material-icons-round">school</span>}
          {analysis?.suggestions && <span className="google-icon  material-icons-round">lightbulb</span>}

        </div>
        <div className="bottom">

          {analysis?.summary && <h4 style={{textShadow: '2px 0px 10px #9d4efe'}}>Summary</h4>}
          {analysis?.explanation && <h4 style={{textShadow: '2px 0px 10px #7578fe'}}>Explanation </h4>}
          {analysis?.suggestions && <h4 style={{textShadow: '2px 0px 10px white'}}>Suggestions </h4>}


          {analysis?.summary && <p>{analysis?.summary}</p>}
          {analysis?.explanation && <p> {analysis?.explanation}</p>}
          {analysis?.suggestions && <p> {analysis?.suggestions}</p>}
          {analysis?.improvedCode && (
            <pre className="code-block"> {analysis?.improvedCode}</pre>
          )}

        </div>
      </div>
          <div
            className={`toggle ${active ? 'active' : ''}`}
            onClick={() => setActive(!active)}
          >
            <div className="handle"></div>
            <span>Activate Lumen</span>
          </div>
    </div>
  );
};

export default ResultCard;
