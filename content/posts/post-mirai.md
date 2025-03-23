---
title: "Building MirAI (HackIllinois 2025)"
summary: "And the pains of prompt engineering"
date: 2025-03-23
tags: [dev, llm, hackathon]
---

I mentioned before on this website that I wanted to keep a record of the projects I've done. Not only can I eventually look back and see what progess I've made as a developer ("wow, I used to write *really* bad code"), but I also want to be able to read this and get up to speed with the project in case I ever want to work on it again. I don't really keep documentation of my projects (bad practice, I know), so this will come in handy for me.

Today, I'll be explaining how me and my team build MirAI during HackIllinois 2025, a 36 hour hackathon at UIUC.

{{< lightimg src="images/mirai/mirai_1.png" alt="MirAI logo" caption="The logo I made for the project" >}}

## What is MirAI?

MirAI is an AI-powered jira/task board (read: gpt wrapper) that can take an idea, generate tickets for it, host virtual stand up, and then modify the task board and track progress. The name MirAI comes from the japanese word Mirai 未来, meaning future. We could've also went with the same word but in Chinese, which is WeiLai 未来 (spelled the same in both languages), but I already knew a company called [WeiLai](https://en.wikipedia.org/wiki/Nio_Inc.) so I didn't want to use the same word.

We chose this project because we wanted to submit a project under the "Dev Tool" track (we thought we had the best chance of winning under this track).

## Features (MVP)

We had a set of features we *needed* to complete before time was up (the minimum viable product MVP), and the features are as follows:

* The MVP should take a project idea, deadlines, titles, descriptions, a set of people on your team and their qualifications (title, yeas of experience, etc) and generate a list of tickets that you can follow to complete your project
* Each ticket needs to have an ID, and can be freely moved to different categories of progress. The categories we had for progress include To Do, In Progress, QA (quality assurance), PR (pull request), and Closed.
* There should be a way to simulate standup (like in most agile workflows), and after each person gives updates to MirAI, it should be able to rearrange or edit the tickets so that progess flows smoothly. We wanted to this be as dynamic as possible, so that means if someone was sick, either their ticket gets assigned to someone else or the deadline gets extended. Or another case would be if someone on the team gets laid off, or if people join, the board should be able to reassign some of the heavier tickets (if needed) or add people to existing ones.
* Tickets should be linked to the project's Github repo. This is copying the feature that Jira already has (but for Github). Essentially, if you are working on ticket #1280, you should include "1280" in your commits, and MirAI will track those and will even be able to give feedback on your code quality.
* Filter tickets by certain catergories (Marketing, R&D, Developing, etc)  
* Have a decent UI

## Wrangling with LLMs

There a lot of LLMs to choose from now, but they all have their respective trade offs. 

In terms of this project, here is what I felt:

| LLM       | Pros                                              |       Cons |
| --------- | ------------------------------------------------- | ---------- |
| Gemini (2.0-flash)   | The API Key is free, and it's relatively fast     | It's not the best at interpreting instructions and struggled to be consistent. Would hallucinate and not follow formatting instructions, and overall made odd decisions.   |
| DeepSeek | Super consistent and made great decisions, and the key is relatively cheap to use | Was super slow, which I think was either because of the reasoning skills or because the servers are located in China
| ChatGPT (4.0) | Consistent and smart, had good customizability in terms of the API (e.g. can add system instructions) | Rather costly compared to the other models, but not enough to be an issue for a hackathon project (I think we only spent 15 cents total). Sometimes would not follow instructions.

Taking all of this into consideration, it was clear that ChatGPT would be the best model to go with for this project.

## Prompt Engineering

Since our project requires the use of these models, we had to deal with the prompt engineering required to get them consistent. I orignally thought this would be the easiest part of the project, but it turns out prompting models is kinda like coding, you really have to specify all the edges cases or it won't do the exact thing you want it to do. 

The way that our project works is that whenver we require to use of AI to either generate or modify tickets, we send in the tickets to the LLM in Json format. Here is an example:

```javascript
[{
    'dev_type': 'Design',
    'title': 'Design a Database Schema',
    'ticket_num': 1280,
    'description': 'Design an ERL diagram of all the tables you will need for this app.',
    'assignments': ["bob12", "alices15"],
    'deadline': "3/1/2025",
    'category': "Todo",
    'priority': 4
},
...
]
```

When we read back the modified or generated tickets from the LLM, we need it to be in the same JSON format. The prompt we used was:

```python
prompt += "Here is the expected format: \n"
prompt += '''
{
    'dev_type': [P&R,Design,Backend,Frontend,Admin,Marketing] - never change the ticket dev_type
    'title': The Ticket Title
    'ticket_num': Ticket Number (if you made new tickets, do not add this field) - never change the ticket number, it should be the same as before
    'description': Description of the ticket and what needs to be done
    'assignments': [List of members assigned to this ticket, by employee ID]
    'deadline': Date for when this ticket should be completed
    'category': Category type of this ticket with this specfic string: (TODO, PROGRESS, QA, PR, CLOSED). Please set this field to CLOSED if the user sid they are finished with it, or in progress if they are working on it. And after they are working on it, place it in QR, and then PR. 
    'priority': A number from 1 to 5, where 1 is low priority, and 5 is high priority, for this ticket
}\n
'''
```

As you can see, it was *a lot* of prompt engineering and reinforcing the rules to the LLM. When we tried out shorter prompts, the LLM would often not behavior as intended. Sometimes when we changed a completely seperate part of the prompt, the LLM would stop performing tasks in another part. We kept adding instructions to the prompt (I think the prompt is more than 300 words long) to keep it consistent. It was kind of like patching a hole with duct tape whenever a leak happened, just for another leak to occur somewhere else.

{{< center >}}
![Flex Tape](https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGN5cWJ6aTFuZ2t3a25kY3ZkcGtidWh0Zm9pdWI2cjJ6cWx2YzgyOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fADf4RUs3hUFvHz18o/giphy.gif)

Flex Tape solves everything
{{< /center >}}

Overall, I thought prompt engineering was probably the most tedious part of this project (maybe second to frontend?). Although I don't see "prompt engineering" ever becoming a real job, I do understand now that it's not easy getting an LLM to perform a more complex task than just checking your homework answers. Some ideas I have that might make this process easier would be using something similar to [Zapier,](https://zapier.com/) which builds workflows and it works great with LLMs.

## Building the Backend

I admit I am not some full-stack wizard, and I'm not very familiar with most backend frameworks. My goto framework is python [Flask](https://flask.palletsprojects.com/en/stable/) because of how lightweight it is and how easy it is for people to pickup. 

The backend was set up so we had a bunch of endpoints that made it easy for the frontend to communicate with the backend. These endpoints corresponded to tasks like initializing a project, adding team members, moving tickets around, simulating standup, etc. Some endpoints returned json ticket responses, which the frontend would then parse and place in the correct categories.

When I first started coding, I barely made use of OOP. I would store everything in one file, leaving almost no abstraction. After working in a few internships, I realized how important it was to keep things organized. Especially since MirAI was made during a short hackathon, I needed my teammates to pick up and use the code I wrote fast. The best way to do this is to abstract away the details, and leave them objects they could use to perform certain tasks. For example, to request anything from an LLM, I made a `requestor.py` file that has a few methods (like asking something general, or with respect to a project) so my teammates could use it in coding their backend functions. I also wrapped details in classes, like project or member details, making them organized and easy to access.

The general flow that our backend goes through is as follows:
* When users start a project, we initialize an empty project on the backend
* They can then update details, and the backend updates the project object in `project.py` with the same details
* Users can then add teammates and their details, which we also reflect on the backend as a member object in `member.py`
* When the user then creates the tickets, a backend request is sent to generate and fetch the tickets
* Whenever stand up is called, a user will input their employee id and their updates, and the backend will ask the LLM to rearrange or modify the tickets
* We have endpoints exposing ticket information, so a user can access the ticket details, as well as look for git commits associated with a certain ticket number.

During the hackathon, we finished the backend first and tested it out before continuing onto the frontend. In hindsight, this was a bad idea. We didn't leave much time left for building the actual UI. If we had built both in parallel, we would have more time to build extra features. What this means though, is that we would've had to done way more planning. What we should've done (and what I will try to do in the future) is to have a clear whiteboard session where we agree on what endpoints we should be making, their function and types (GET/POST, etc), and how the frontend will interact with the backend. This way, we can develop both independently without much conflict.

## "Building" the Frontend

I don't know much about frontend. All I've really done is pure HTML and CSS before, and I'm not even that good at it. If you gave me React code, I think I could sort of figure out what is going on and might be able to modify it to my liking (I've done this quite a few times), but I wouldn't know how to start making a React app.

Turns out I'm not the only one. My teammates also were not very familiar with frontend--except one that had a bit of experience in it. We used [Next.js](https://nextjs.org/) to set up the frontend, using React for the website.

None of us really knew how to make good UI, so we resorted to using LLMs to help us code. We allowed GPT to read our backend code, where it was able to generate the frontend React code, as well as the typescript necessary to send requests to Flask. Obviously, LLMs sometimes struggle with creating functional code, so we had to debug a lot of the output that came out of the models. However, I am very suprised at ChatGPT's ability to produce really good designs. You would think that since ChatGPT can't see the design it would not be great at frontend, but I guess it was able to learn design pattersn from just the code it was trained on. That's kind of insane if you ask me. It's like if someone with severe visual impairment since birth could perfectly picture the world based on just listening to someone talk about it. 

Here is how our frontend looked like:


{{< center >}}

{{< lightimg src="images/mirai/mirai_2.jpg" alt="MirAI task board" caption="The frontend for the actual board" >}}

***Hydro Homies***
{{< /center >}}


## Future

There are some features I would like to eventually implement. These include:
* Adding the ability to send google calendar invites for meetings
* Getting standup to be more collaborative, using live chat for example
* Integrating with Slack to be able to find channels or people that can help you with your ticket
* Improving the interface and allowing for more than one project at a time

I think great tools should work well with other great tools. Integration is definetly a top priority for any tool in my opinion. 

## Putting it all together

Overall, I was pretty satisfied with the project, and we finished around midnight of the second day, 8 hours before submission. Unfortunately, we did not win anything (we weren't even runner ups), but it was a good experience nonetheless. In the future, I need to remind myself that I don't need a hackathon to force myself to do projects---I should do them by myself whenever I have time. 

If you want to checkout the github repo for the project, it is [here.](https://github.com/JhaoZ/mirai/tree/main) The devpost submission is [here.](https://devpost.com/software/mirai-97gpno)