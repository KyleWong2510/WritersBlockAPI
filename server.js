const express = require('express')
const app = express()
const cors = require('cors')

const sampleData = require('./sampleData')

app.use(express.json())
app.use(cors())
app.set('port', process.env.PORT || 3001)

app.locals.title = 'Writer\'s Block API'
app.locals.prompts = sampleData.samplePrompts
app.locals.stories = sampleData.sampleStories

app.get('/', (request, response) => {
  response.status(200).json(app.locals.title)
})

app.get('/api/v1/prompts', (request, response) => {
  response.status(200).json(app.locals.prompts)
})

app.get('/api/v1/stories', (request, response) => {
  response.status(200).json(app.locals.stories)
})

app.post('/api/v1/prompts', (request, response) => {
  const newPrompt = request.body;

  for (let requiredParameter of ['id', 'prompt']) {
    if (!newPrompt[requiredParameter]) return response.status(422).json({message: `You are missing a required parameter of ${requiredParameter}`});
  }

  app.locals.prompts = [...app.locals.prompts, newPrompt];

  return response.status(201).json(newPrompt);
});

app.post('/api/v1/stories', (request, response) => {
  const newStory = request.body;

  for (let requiredParameter of ['promptId', 'storyId', 'authorName', 'storyText', 'storyTitle']) {
    if (!newStory[requiredParameter]) return response.status(422).json({message: `You are missing a required parameter of ${requiredParameter}`});
  }

  app.locals.stories = [...app.locals.stories, newStory];

  return response.status(201).json(newStory);
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is now running on port ${app.get('port')}!`);
});