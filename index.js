const PORT = process.env.PORT || 8000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();

const universityURL = 'https://www.classcentral.com/university/rice';

app.get('/', (req, res) => {
    axios.get(universityURL)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            const courses = [];

            $('a.course-name', html).each(function () {
                const title = $(this).text();
                const url = $(this).attr('href');
                courses.push({
                    title,
                    url: `https://www.classcentral.com${url}`,
                    university: 'Rice University'
                })
            });

            res.json(courses);
        })
        .catch(err => console.log(err));
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
