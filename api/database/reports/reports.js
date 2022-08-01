const fs = require('fs');
const puppeteer = require('puppeteer');
const hb = require('handlebars');
const preset = fs.readFileSync(`${__dirname}/report.hbs`, {encoding: 'utf-8'});

const globalController = require('../../components/global/controller');
const sellsController = require('../../components/sells/controller');
const buysController = require('../../components/buys/controller');
const boxesController = require('../../components/cashRegister/controller');

const compileHandlebars = (data) => {
    const compiled = hb.compile(preset, { strict: true });
    const file = compiled({data});
    return file;
};

const convertToPDF = async (file, date) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage()
    // We set the page content as the generated html by handlebars
    await page.setContent(file)
    // We use pdf function to generate the pdf in the same folder as this file.
    await page.pdf({ path: `${__dirname}/store/report-${date}.pdf`, format: 'A4' })
    await browser.close();
};

const generateReport = async (date, dateToPath) => {
    const global = await (await globalController.getOne(1)).get();
    const { todaySells, moneyAmount, howMuchPaid } = await sellsController.getDailyReport(date);
    const moneyInAllBoxes = await boxesController.getMoneyInAllBoxes();

    const data = { date, global, sells: todaySells, moneyAmount, howMuchPaid, moneyInAllBoxes };

    const file = compileHandlebars(data);
    await convertToPDF(file, dateToPath);
};

//generateReport('2022/05/10', '2022-05-10').then(e => {})

module.exports = {
    convertToPDF,
    compileHandlebars,
    generateReport,
};