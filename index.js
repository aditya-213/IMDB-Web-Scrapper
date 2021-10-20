const request = require("request-promise")
const cheerio = require("cheerio")
const fs = require("fs")
const json2csv = require("json2csv")

const movie = "https://www.imdb.com/title/tt2356180/?ref_=tt_sims_tt_i_4";  // URL of the movie page
(async () => {
    let imdbData = []
    const response = await request({
        uri: movie,
        headers: {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9"
        },
        gzip: true,
    });

   // console.log(response);

    let $ = cheerio.load(response)

    // Copy selector of each element (like title, rating, summary from IMDB website)

    const title = $('#__next > main > div > section.ipc-page-background.ipc-page-background--base.TitlePage__StyledPageBackground-wzlr49-0.dDUGgO > section > div:nth-child(4) > section > section > div.TitleBlock__Container-sc-1nlhx7j-0.hglRHk > div.TitleBlock__TitleContainer-sc-1nlhx7j-1.jxsVNt > h1').text();
    const rating = $('#__next > main > div > section.ipc-page-background.ipc-page-background--base.TitlePage__StyledPageBackground-wzlr49-0.dDUGgO > section > div:nth-child(4) > section > section > div.Hero__MediaContentContainer__Video-kvkd64-2.kmTkgc > div.Hero__ContentContainer-kvkd64-10.eaUohq > div.Hero__MetaContainer__Video-kvkd64-4.kNqsIK > div.RatingBar__RatingContainer-sc-85l9wd-0.hNqCJh.Hero__HideableRatingBar-kvkd64-12.hBqmiS > div > div:nth-child(1) > a > div > div > div.AggregateRatingButton__ContentWrap-sc-1ll29m0-0.hmJkIS > div.AggregateRatingButton__Rating-sc-1ll29m0-2.bmbYRW > span.AggregateRatingButton__RatingScore-sc-1ll29m0-1.iTLWoV').text();
    const summary = $('#__next > main > div > section.ipc-page-background.ipc-page-background--base.TitlePage__StyledPageBackground-wzlr49-0.dDUGgO > section > div:nth-child(4) > section > section > div.Hero__MediaContentContainer__Video-kvkd64-2.kmTkgc > div.Hero__ContentContainer-kvkd64-10.eaUohq > div.Hero__MetaContainer__Video-kvkd64-4.kNqsIK > div.GenresAndPlot__ContentParent-cum89p-8.bFvaWW.Hero__GenresAndPlotContainer-kvkd64-11.twqaW > p > span.GenresAndPlot__TextContainerBreakpointXS_TO_M-cum89p-0.dcFkRD').text();
    
   /* console.log(title);
    console.log(rating);
    console.log(summary); */


    
    imdbData.push({
        title,
        rating, 
        summary,
    });

    const csv = json2csv.parse(imdbData);  // converting json into csv

    console.log(csv);

    fs.writeFileSync("./imdb.csv", csv, "utf-8");  // write on the disk
    
}

)

();
