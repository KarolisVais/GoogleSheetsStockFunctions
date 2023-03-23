function main() {
  var ticker = 'T';
  console.log(ShortName(ticker));
  console.log(CurrentPrice(ticker));
  console.log(ForwardPE(ticker));
  console.log(EPSGrowth(ticker));  
  console.log(DivRateAndYield(ticker));
  console.log(DivYield(ticker));
  console.log("Avrage Div Growth Rate: "+ Div5YearGrowth(ticker));
}

function ShortName(ticker)
{
  const url = 'https://query2.finance.yahoo.com/v10/finance/quoteSummary/' + encodeURI(ticker) + '?modules=price';
  
  let response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  if (response.getResponseCode() == 200) {
      var object = JSON.parse(response.getContentText());
  }
  let result  = object.quoteSummary.result[0]?.price?.shortName || '-';
  
  return [result];
}

function CurrentPrice(ticker) {
  const url = 'https://query2.finance.yahoo.com/v10/finance/quoteSummary/' + encodeURI(ticker) + '?modules=price';
  
  let response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  if (response.getResponseCode() == 200) {
      var object = JSON.parse(response.getContentText());
  }
  let result  = object.quoteSummary.result[0]?.price?.regularMarketPrice?.raw || '-';
  
  return [result];
}

function MarketChange(ticker) {
  const url = 'https://query2.finance.yahoo.com/v10/finance/quoteSummary/' + encodeURI(ticker) + '?modules=price';
  
  let response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  if (response.getResponseCode() == 200) {
      var object = JSON.parse(response.getContentText());
  }
  let result  = object.quoteSummary.result[0]?.price?.regularMarketChange?.raw || '-';
  
  return [result];
}

function MarketChangePercent(ticker) {
  const url = 'https://query2.finance.yahoo.com/v10/finance/quoteSummary/' + encodeURI(ticker) + '?modules=price';
  
  let response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  if (response.getResponseCode() == 200) {
      var object = JSON.parse(response.getContentText());
  }
  let result  = object.quoteSummary.result[0]?.price?.regularMarketChangePercent?.fmt || '-';
  
  return [result];
}

function DivRateAndYield(ticker) {
  const url = 'https://query2.finance.yahoo.com/v10/finance/quoteSummary/' + encodeURI(ticker) + '?modules=summaryDetail';
  
  let response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  if (response.getResponseCode() == 200) {
      var object = JSON.parse(response.getContentText());
  }
  let divrate  = object.quoteSummary.result[0]?.summaryDetail?.dividendRate?.raw || '-';
  let divyield  = object.quoteSummary.result[0]?.summaryDetail?.dividendYield?.raw || '-';
  
  return [divrate,divyield];
}
function DivRate(ticker) {
  const url = 'https://query2.finance.yahoo.com/v10/finance/quoteSummary/' + encodeURI(ticker) + '?modules=summaryDetail';
  
  let response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  if (response.getResponseCode() == 200) {
      var object = JSON.parse(response.getContentText());
  }
  let divrate  = object.quoteSummary.result[0]?.summaryDetail?.dividendRate?.raw || '-';
  
  return [divrate];
}
function DivYield(ticker) {
  const url = 'https://query2.finance.yahoo.com/v10/finance/quoteSummary/' + encodeURI(ticker) + '?modules=summaryDetail';
  
  let response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  if (response.getResponseCode() == 200) {
      var object = JSON.parse(response.getContentText());
  }
  let divyield  = object.quoteSummary.result[0]?.summaryDetail?.dividendYield?.raw || '-';
  if (divyield == '-'){
    divyield  = object.quoteSummary.result[0]?.summaryDetail?.yield?.raw || '-';
  }
  return [divyield];
}



function ForwardPE(ticker) {
  const url = 'https://query2.finance.yahoo.com/v10/finance/quoteSummary/' + encodeURI(ticker) + '?modules=price,summaryDetail';
  
  let response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  if (response.getResponseCode() == 200) {
      var object = JSON.parse(response.getContentText());
  }
  let fwdPE  = object.quoteSummary.result[0]?.summaryDetail?.forwardPE?.fmt || '-';
  
  return [fwdPE];
}

function EPSGrowth(ticker) {
  const url = 'https://query2.finance.yahoo.com/v10/finance/quoteSummary/' + encodeURI(ticker) + '?modules=earningsTrend';
  
  let response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  if (response.getResponseCode() == 200) {
      var object = JSON.parse(response.getContentText());
      let fwdPE  = object.quoteSummary.result[0]?.earningsTrend.trend[4].growth.fmt || '-';

      return [fwdPE];
  }
  return ['-'];
}

function Div5YearGrowth(ticker) {
  const url = 'https://seekingalpha.com/api/v3/metrics?filter[fields]=div_yield_fwd,dividend_yield,div_rate_fwd,div_rate_ttm,payout_ratio,div_grow_rate5,dividend_growth&filter[slugs]='+ encodeURI(ticker);
  //const url = 'https://seekingalpha.com/api/v3/metrics?filter[fields]=payout_ratio,div_grow_rate5,dividend_growth&filter[slugs]='+ encodeURI(ticker) +'&minified=false';
  
  let config = {
    muteHttpExceptions: true,
    contentType: 'application/json',
  };
  let response = UrlFetchApp.fetch(url, config);
  if ((response.getResponseCode() == 200)||(response.getResponseCode() == 304)){
    var object = JSON.parse(response.getContentText());
    let div_grow_rate5 = object.data[3].attributes.value || '-';
  
    return [div_grow_rate5,url];
  }
  // due to captcha it not always gets result? 
  return ['?',url];
}

function ROE(ticker)
{
  const url = "https://finviz.com/quote.ashx?t="+ticker;
  ///html/body/div[5]/div/table[2]/tbody/tr[6]/td[8]/b/span


}

function downloadAsFile() {
  var content = UrlFetchApp.fetch('https://seekingalpha.com/symbol/SLG/dividends/scorecard').getContentText();
  var html = HtmlService.createHtmlOutput(`
    <html><body onload="document.getElementById('dwn-btn').click()">
    <textarea id="text-val" rows="10" style="display:none;">${content}</textarea>
    <input type="button" id="dwn-btn" value="Download text file" style="display:none;"/>
    <script>
    window.close = function(){window.setTimeout(function(){google.script.host.close()},100)}
    function download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
    document.getElementById("dwn-btn").addEventListener("click", function(){
        var text = document.getElementById("text-val").value;
        var filename = "HTMLFile.txt";
        download(filename, text);
      close();
    }, false);
    </script>
    </body></html>  
  `)
    .setWidth(250).setHeight(100);
  SpreadsheetApp.getUi().showModalDialog(html, "Download file ...");
}


