const readline = require('readline');
const fs = require('fs');
const wr = fs.createWriteStream('Part1.json')
const wr2 = fs.createWriteStream('Part2.json')
const wr3 = fs.createWriteStream('Part3.json')

var obj = null,
    a, fin = [],
    fin2 = [],
    fin3 = [],
    fin4 = {},
    fin5 = [], fin6 = [], fin7 = []
var asia = ["Afghanistan", "Armenia", "Azerbaijan", "Bahrain", "Bangladesh", "Bhutan", "Brunei Darussalam",
    "Cambodia", "China", "Cyprus", "Georgia", "India", "Indonesia", "Iraq", "Israel", "Japan", "Jordan", "Kazakhstan",
    "Kuwait", "Kyrgyz Republic", "Lao PDR", "Lebanon", "Malaysia", "Maldives", "Mongolia", "Myanmar", "Nepal", "Oman",
    "Pakistan", "Philippines", "Qatar", "Russian Federation", "Saudi Arabia", "Singapore", "Sri Lanka", "Syrian Arab Republic",
    "Tajikistan", "Thailand", "Timor-Leste", "Turkey", "Turkmenistan", "United Arab Emirates", "Uzbekistan", "Vietnam"
]
var c = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
var cc = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
const rl = readline.createInterface({
    input: fs.createReadStream('Indicators.csv')
});

rl.on('line', (line) => {
    a = line
        .split(',')

    if (a[4] >= 1960 && a[4] <= 2015) {
        if (a[0] == "India" && (a[2] == "Rural population (% of total population)" || a[2] == "Urban population (% of total)")) {
            obj = {
                country: a[0],
                pop: a[2],
                year: a[4],
                value: a[5]
            }
        } else obj = null

        if (obj != null)
            fin.push(obj)


        if (a[0] == "India" && a[2] == "Urban population growth (annual %)") {
            obj = {
                country: a[0],
                pop: a[2],
                year: a[4],
                value: a[5]
            }
        } else obj = null

        if (obj != null)
            fin2.push(obj)

        for (let i = 0; i < asia.length; i++) {
            if ((a[0] == asia[i]) && (a[2] == "Urban population" || a[2] == "Rural population")) {

                obj = {
                    country: a[0],
                    pop: a[2],
                    year: a[4],
                    value: a[5]
                }
            } else obj = null

            if (obj != null)
                fin3.push(obj)
        }
    }
})
var f
rl.on('close', () => {
	for(let i=0;i<fin.length;i+=2)
	{
		obj = {
			year: fin[i].year,
			rural: fin[i].value,
			urban: fin[i+1].value
		}
		fin6.push(obj)
	}
    wr.write(JSON.stringify(fin6, null, 2), 'UTF8')
    wr2.write(JSON.stringify(fin2, null, 2), 'UTF8')
    var sum = []
    for (let i = 0; i < fin3.length / 2; i++) {

        fin4[i] = {
            country: fin3[i * 2].country,
            year: fin3[i * 2].year,
            rural: parseFloat(fin3[i * 2].value),
            urban: parseFloat(fin3[i * 2 + 1].value)
        }
        fin5.push(fin4[i])
    }
 
    for(let y=0;y<fin5.length;y++)
    {
        for(let g=0;g<asia.length;g++)
{
    if(fin5[y].country==asia[g])
    {
        c[g]+=fin5[y].rural
        cc[g]+=fin5[y].urban
    }
    }
}
for(let g=0;g<asia.length;g++)
{
    obj = {
        country: asia[g],
        rural: c[g],
        urban: cc[g]
    }
    fin7.push(obj)
}
    fin5.sort((a, b) => (b.rural+b.urban) - (a.rural+a.urban))
    wr3.write(JSON.stringify(fin7, null, 2), 'UTF8')
})