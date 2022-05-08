import express from 'express';
const app = express();
import { Job } from './job.model.js';
import elasticsearch from 'elasticsearch';
import './db.js';
import { User } from './user.model.js';

const client = new elasticsearch.Client({
  host: process.env.ELASTIC_SEARCH_URL,
});

app.use(express.json());

app.get('/jobs', async (req, res) => {
  res.json(await Job.find());
});

app.post('/jobs', async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.send(job);
});

app.get('/users', async (req, res) => {
  res.json(await User.find());
});

app.post('/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send(user);
});

app.get('/search', async (req, res) => {
  const data = await client.search({
    index: 'jobs',
    body: {
      size: req.query.limit || 10,
      from: req.query.skip || 0,
      query: {
        bool: {
          should: [
            {
              match: {
                title: { query: req.query.text, fuzziness: 2 },
              },
            },
            {
              match: {
                description: { query: req.query.text, fuzziness: 2 },
              },
            },
          ],
          // "should": [
          //   {
          //     "wildcard": {
          //       "title": {
          //         "value": `*${req.query.text}*`,
          //         "boost": 1,
          //         "rewrite": "constant_score"
          //       }
          //     }
          //   },
          //   {
          //     "wildcard": {
          //       "description": {
          //         "value": `*${req.query.text}*`,
          //         "boost": 1,
          //         "rewrite": "constant_score"
          //       }
          //     }
          //   }
          // ]
        },
      },
    },
  });
  res.json(
    data.hits.hits.map((doc) => ({
      _id: doc._id,
      ...doc._source,
    }))
  );
});

app.listen(4000, () => {
  console.log('App listening on port 4000');
});
