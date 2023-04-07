import * as fs from 'fs';
import * as http from 'http';
import * as url from 'url';
import slugify from 'slugify';
import { replaceTemplate } from './replaceTemplate';


///////////////////////////////
//FILES

// const textInput = fs.readFileSync('./txt/input.txt', 'utf8');

// console.log(textInput);

// const textOutput = `This is what we know about the avocado: ${textInput}.\nCreated on ${Date.now()}`;

// fs.writeFileSync('./txt/output.txt', textOutput);
// console.log('File written!');


// fs.readFile('./txt/start.txt', 'utf8', (err, data1) => {
//     fs.readFile(`./txt/${data1}.txt`, 'utf8', (err, data2) => {
//         console.log(data2);
//         fs.readFile(`./txt/append.txt`, 'utf8', (err, data3) => {
//             console.log(data3);

//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf8', err => {
//                 console.log('Your file has been written 😁');
//             })
//         })
//     })
// });
// console.log('will read file');


///////////////////////////////
//SERVER

const tempOverview = fs.readFileSync(`${__dirname}/../templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/../templates/template-card.html`, 'utf-8');
const tempproduct = fs.readFileSync(`${__dirname}/../templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/../dev-data/data.json`, 'utf-8');
const dataObj:any[] = JSON.parse(data);

const slugs = dataObj.map((el: any) => slugify(el.productName, { lower: true }) );
console.log(slugs);


const server = http.createServer((req, res) => {
    debugger;
    const {query, pathname} =  url.parse(req.url as string, true);

    //Overview page
    if(pathname === '/'|| pathname === '/overview') 
    {
        res.writeHead(200, { 'Content-type': 'text/html' });
        const cards = dataObj.map((el: any) => replaceTemplate(tempCard, el));
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cards.join(''));
        res.end(output);
    }
    //Product page
    else if(pathname === '/product') { 
        res.writeHead(200, { 'Content-type': 'text/html' });
        const product = dataObj[query.id as unknown as number];
        const output = replaceTemplate(tempproduct, product);
        res.end(output); 
    }
    //API page
    else if(pathname === '/api') {
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(dataObj);
    }
    //Not found
    else{
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Page not found!</h1>');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
});


