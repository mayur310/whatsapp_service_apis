const axios = require('axios');
// const apiUtils = require('../utils/apiUtils');

async function processCSV(buffer) {
    
  const dataArray = [];
  

  try {
    // Convert buffer to string
    const csvString = buffer.toString('utf-8');

    // Parse CSV string as JSON
    const rows = csvString.split('\n');
    const headers = rows[0].split(',').map(header => header.replace(/"/g, '').trim()); // Remove quotes from headers

    for (let i = 1; i < rows.length; i++) {
      const values = rows[i].split(',').map(value => value.replace(/"/g, '').trim()); // Remove quotes from values

      // Check if all values are empty, skip creating an empty object
      if (values.every(value => value === '')) {
        continue;
      }

      const rowObject = {};

      for (let j = 0; j < headers.length; j++) {
        rowObject[headers[j]] = values[j];
      }

      dataArray.push(rowObject);
    }

    console.log('CSV Processing successful');
    return Promise.resolve(dataArray);
  } catch (error) {
    console.error('Error processing CSV:', error);
    return Promise.reject(error);
  }
}

function formatDataForAPI(data) {
    return {
        apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWY2MmE5Yzk4Nzk3MGFlZWM1ZTg0MCIsIm5hbWUiOiJOZW9QaHl0ZSIsImFwcE5hbWUiOiJBaVNlbnN5IiwiY2xpZW50SWQiOiI2NTVmNjJhOGM5ODc5NzBhZWVjNWU4M2IiLCJhY3RpdmVQbGFuIjoiQkFTSUNfTU9OVEhMWSIsImlhdCI6MTcwMDc0OTk5M30.8-SugzKOaRlF3BFhgTn944znZnsydeoUPudFEIZdNWs",
        campaignName: "shelf_onboarding_api_prod_campaign",
        destination: "91" + data["Mobile Number"],  // Assuming "Mobile Number" is the key
        userName: data["Agent's Name"],
        source: "CSV import",
        media:{"url": "https://whatsapp-media-library.s3.ap-south-1.amazonaws.com/FILE/655f62a9c987970aeec5e840/6481951_NeoDIShAShelfcapturerecommendations.pdf","filename": "NeoDIShA_Shelf_capture_recommendations.pdf"},
        templateParams: ["$AgentName"],
        tags: ["AgentName"],
        attributes: {
          "AgentName": data["Agent's Name"]
        }
      };
}

function makeAPICall(apiKey, apiUrl, data) {
    axios.post(apiUrl, data, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      })
      .then((response) => {
        console.log('API Call Successful (Aisensy):', response.data);
      })
      .catch((error) => {
        console.error('API Call Failed:', error.message);
      });
}

function processAndMakeAPICalls(dataArray) {
    const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWY2MmE5Yzk4Nzk3MGFlZWM1ZTg0MCIsIm5hbWUiOiJOZW9QaHl0ZSIsImFwcE5hbWUiOiJBaVNlbnN5IiwiY2xpZW50SWQiOiI2NTVmNjJhOGM5ODc5NzBhZWVjNWU4M2IiLCJhY3RpdmVQbGFuIjoiQkFTSUNfTU9OVEhMWSIsImlhdCI6MTcwMDc0OTk5M30.8-SugzKOaRlF3BFhgTn944znZnsydeoUPudFEIZdNWs";  // Replace with your actual API key
  const apiUrl = "https://backend.aisensy.com/campaign/t1/api/v2"; 
  const delayBetweenCalls = 2000;

  // Loop through dataArray and make API calls
  dataArray.forEach((data, index) => {
    setTimeout(() => {
      const formattedData = formatDataForAPI(data);
      makeAPICall(apiKey, apiUrl, formattedData);
    }, index * delayBetweenCalls);
  });
}

module.exports = {
  processCSV,
  formatDataForAPI,
  makeAPICall,
  processAndMakeAPICalls,
};