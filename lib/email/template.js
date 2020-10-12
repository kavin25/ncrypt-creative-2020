module.exports = ({ unsubLink, loginLink, today, issueId, repos }) =>
  `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Nunito:wght@400;700;900&display=swap" rel="stylesheet">
<style>
  body {
    font-family: "Lato", sans-serif;
    color: #252525;
  }
  
  .fh {
    font-family: "Nunito", sans-serif;
  }
    ` +
  `
  
  .box {
    max-width: 500px;
    width: 100%;
    margin: 30px auto;
    padding: 20px; border: 2px solid #AAA8D440;
    border-radius: 15px;
    display: block;
  }
  
  .header .meta {
    width: 100%;
    text-align: center;
    margin-top: 25px;
  }
  
  .header .logo {
    text-align: center;
    margin-top: 10px;
  }
  
  .header .logo span {
    font-weight: 700;
    font-size: 2.5rem;
    padding: 10px 20px;
    background: #AAA8D440;
    color: #6056A5;
    border-radius: 15px;
  }
  
  .footer {
    text-align: center;
    font-size: 0.9rem;
    line-height: 1.6rem;
    color: #666;
  }
  
  .footer a {
    text-decoration: none;
    color: #6056A5;
    border-bottom: 4px solid #6056A520;
    margin: 0 10px;
  }
  
  
  .item {
    text-decoration: none;
    display:-webkit-flex;
    display:-ms-flexbox;
    display: flex;
    color: inherit;
  }
  
  .item .vote {
    margin-right: 20px;
  }
  
  .item .repo {
    font-size: 1.3rem;
    font-weight: bold;
  }
  
  .item .languages, .item .tags {
    display: -webkit-flex;
    ` +
  `
    display: -ms-flexbox;
    display: flex;
  }
  
  .item .languages {
    margin: 7px 0px;
    font-size: 0.9rem;
  }
  
  .item .tag {
    margin: 5px 7px;
    font-size: 0.85rem;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px 9px;
    border: none;
    border-radius: 5px;
    background: #6056A5;
    color: #fcfdfc;
  }
  
  .item .tag:first-child {
    margin-left: 0;
  }

  .item .tag:last-child {
    margin-right: 0;
  }
  
  .item .description {
    margin-top: 15px;
  }
</style>
</head>
<body style="margin: 0; padding: 0;">
  <div class="main">
    <div class="header box">
      <div class="logo"><span class="fh">DevLetter</span></div>
      <div class="meta">
        ${today}<span style="margin: 0 10px;">|</span>Issue ID: ${issueId}
      </div>
    </div>
    
    <div class="items">
    ${repos
      .map(
        (repo) => `
      <a class="item box" href="${
        repo.link
      }" style="text-decoration: none; color: inherit;">
        <div class="content">
          <div class="repo fh">${repo.fullName}</div>
          ${
            repo.languages.length > 0
              ? `<div class="languages">
              ${repo.tags.map((tag) => `<div class="tag">${tag}</div>`)}
             </div>`
              : ""
          }
          ${
            repo.tags.length > 0
              ? `<div class="tags">
              ${repo.tags.map((tag) => `<div class="tag">${tag}</div>`)}
             </div>`
              : ""
          }
          ${
            repo.description
              ? `<div class="description">${repo.description}</div>`
              : ""
          }
        </div>
      </a>
      `
      )
      .join("")}
    </div>
    
    <div class="footer box">
      DevLetter, Exun Clan,<br />
      Delhi Public School, R.K. Puram<br />
      Made with <span style="color: #ff91a4;">&lt;3</span> for <span style="color: #F10101;">nCrypt 2020</span>.<br />
      <a href="${unsubLink}">Unsubscribe</a> | <a href="${loginLink}">Configure</a>
    </div>
  </div>
</body>
</html>
`;
