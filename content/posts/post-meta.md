---
title: "The Meta Internship Experience"
description: "And why the FAANG dream is dead (or needs to die)"
date: 2026-02-15
tags: [internship, recruiting]
---

I realize I have not updated this blog in about a year, which makes sense given my hectic schedule for the past 4 years of college. Now that I'm finally in my last semester of college, I have a bit more freedom, which I want to dedicate to writing more posts. 

In retrospect, I should've written this article way earlier (preferably when I just finished the internship). If you haven't guessed by the title, I want to talk about my software engineer internship at Meta (previously known as Facebook). I worked out of the Menlo Park Office in the Bay Area of California, which is the HQ.

Why did I go to Meta? I chose Meta over both my Google and Amazon offers (sometimes I regret it, sometimes I don't) because they were the first FAANG company to give me an offer. Amazon and Google gave me an offer about 4 months after I got my Meta offer, which was way too late for me.

# So what did I do

I was placed on a compiler subteam called PoGO-Stick, part of Meta's larger Android Compiler Team called Redex. {{< compact_link "https://github.com/facebook/redex" >}}Redex{{< /compact_link >}}, is an open source Android "compiler." In reality it is a bytecode optimizer that takes the code for Meta's Anrdoid apps and compresses them by transforming, modifying, and deleting code through compiler optimizations. By reducing size, the speed of the apps also increase. My subteam deals with supplying profiling data to the compiler so it makes better optimizations.

My project was essentially to great a graph algorithm to fuzz the compiler by generating consistent profiling data. That sentence probably does not make sense to most people, so I'll explain it better. The compiler collects data about which code blocks are hit (deemed hot if hit, cold otherwise), and sometimes there are "violations" that occur. An example would be a cold set of code that leads into a hot set of code, technically impossible since that means the first set cannot be cold. This means that somewhere in the compiler, the code is likely being transformed incorrectly, or there is an issue with the pipeline of data. The goal for my project was to generate random data that made sense, feed it into the compiler, and see whats happening. Through this method, known as fuzz testing, we might be able to find out where some of the errors in the compiler lie.

Why am I allowed to talk about this in detail? Well, the compiler is open source, so anyone can read the code and figure out whats going on anyway. None of this is proprietary. This is one of the benefits on being on this team, I don't think I could talk about any other intern project this deeply without violating an NDA somewhere.

# Orientation

The first day for a Meta Intern looks like this: You wake up, find where your shuttle stop is, enter the shuttle and be shocked about the number of monitors on the seats, take the bus down to the new campus of Meta, get off, wait in line with a few hundred other interns, check-in and grab your badge, walk about half a mile to the orientation area, eat breakfast and try to meet new interns (you'll most likely never see most of them again), head into the orientation room, and spend the next 6 hours listening to orientation yap.

I don't remember much about orientation, maybe because I was super tired from the fact that I got to my corporate housing at 11 pm the night before due to (expected, because its ORD) delays. Maybe it was the fact that I didn't take a break before school ended and jumped straight into interning (I even skipped my graduation to start early). They showed us some cool videos on the new products like the RayBans and the Meta Quest, and they even had demos for us during lunch break. 

A lot of information was shown to us during orientation, but I only remember one thing clearly. They gave out a list of values that Meta has, and I can't remember a single one, except the first one. 

{{< bold_quote "\"Move Fast and Break Things\"" >}}

I think this is what sets Meta apart from the rest of the FAANG. My internship experience can be summarized in those 5 words. 

Meta depends on their engineers to move fast and have high output (this is always why instagram is so buggy). From Day 2, I was submitting code (called diffs). Even though I did not explicitly "break things," I did have times where I needed to revert changes that might have not happened if I wasn't in such a rush to submit code as much as possible. You might be wondering, why was I in such a rush...?

# The Rating System

What might be the worst part of the internship is the rating system. From day 1, you are told that you are in competition with your fellow interns. Only X% of the interns get return offers, and everyone there wants one (especially in this job market). This included me. I knew from day 1 that I would have to give it my all since I wouldn't know how many return offers they woudl give this year. 

How does the rating system work? In simple, there are a few ratings interns (and full timers!) get:
- GE (Greatly Exceeds) - One of the best ratings you can get. It means that you greatly exceeded the expectations they had for you as an intern. This usually means not only completing your intern project, but being integrated with your team and making a large impact. As an engineer, you are at least operating at mid-level position. The interns I've seen get GE often targetted cross team projects or made insanely large contributions to their team. Technically, there is a level about GE called RE (Redefines Expectations) but I did not meet any intern that got that rating and its very very rare. GEs usually get return offers (except one year when there was rescinded offers)
* EE (Exceeds Expectations) - This rating is pretty good, but not a guarantee for a return offer. It generally means you completed your intern project and stretch goals (extra stuff your manager gives to you). You should be in good communication with your manager and have good rapport with your team. I think most interns aim for this.
- MA (Meets All) - This rating means that you met the expectations of an intern. You completed the project, and have the skills to be a successful new hire at Meta. However, MA puts you in larger risk of not receiving a return offer. Technically, you meet the requirements to being hired, but if there is limited headcount, it might be tough to justify a return offer.
* BE/MS/MN (Below Expectations / Meets Some / Meets None) - This is essentially getting a "FAIL." It means that you didn't finish your project, or you had other issues that would make you a bad fit as a new hire. Regardless of how many return offers the company gives, interns that receieve this rating will not get a return offer no matter what.

Each intern is rating on a few axes, such as communication, ability to learn, engineering ability, etc. Each axis gets a rating, and your total rating is an aggregate of what you got on the axes. 

Who decides what you get? Well...

# Calibration

This is a dreaded event for a Meta intern. Calibration is when your manager meets with a grouop of other managers, as well as a few leads, to discuss if their rating of you is deserved. Think of it like a trial, other managers and leads can try to knock down your rating, and your manager has to defend you (or not, I guess). Where is the evidence coming from? *You.*

Each intern writes a calibration document discussing what they did and relate it the axes they are being graded on. Your manager can use this to back up the rating they give you and hopefully defend your work. Why would other managers try to knock down your rating? Ratings are curved, meaning only X% can receive a certain rating. Each cohort of calibration is ~10 interns, and they can't just give all 10 of them GE. The higher your rating is, the better it is for your manager (it helps them promote faster), so they want you to have a high rating. In this sense, you and your manager are on the same team, but if you do bad, your manager will have no choice but to give you a bad rating.

How else is rating decided? The amount of code you write. This is arguable the worst thing about the internship. The amount of code output, in my opinion, has little impact on the quality of work you do. In fact, my team averages much lower code output than say a mobile app team (they have to write so much frontend design code). My project specifially, was heavy on design and algorithmic thinking, which translates to less code. I remember early on my manager mentioned that getting a return offer might be difficult since the previous interns on my team struggled with code output. In calibration, your code output is compared to the 9 other interns you are competing against.

Calibration happens twice, once during midpoint, and once at the end. The midpoint one is mostly to show if you are on track, and the calibration at the end is your final rating. Usually, you need to show improvement from the first calibration to the second, regardless of how well you are doing. This was a hard part for me, and I spent a long time figuring out how I could make a large improvement (read below to found out what I ended up doing).

I don't know what my rating is. You aren't supposed to know (some managers will tell their interns, mine did not). Since I did receive a return offer and had very positive feedback, I assumed that I at least got EE. My goal was GE, but I guess I'll never know if I got it or not.

Oh, just in case you thought this was just for interns? It's not. This process happens twice a year for all the engineers at Meta, and its a stressful time because if you get a bad rating, you might just be on the next round of layoffs.

# Aiming for GE

I don't know why I wanted to get a GE rating so bad. Maybe it was to fulfill my ego, or maybe it was because I could be safe in knowing I'd get a return offer, or maybe I just felt like I wanted a challenge. I still don't know why, but I know that from day 1, I was dead set on getting a GE rating.

I finished the basics (at least, the hardest part) of my project in about 4 weeks, and after some tweaking and additional changes, I was essentially done with my main project. My manager gave me great feedback on what to do to achieve a better rating. In essence, I needed to be more proactive and have more initiative. I accomplished this by taking on small side projects as I went through the internship. This included making a debugging visualization tool for my team, building metric collecting data pipelines to track progress, and making graph visualizers to compare before and after changes. 

Along the way, I picked up some small tasks my team had lying around as I waited for my code to compile and run through tests. 

By completing my main project, my 3 side projects, and the random tasks my team had, I ended up with 60+ code submissions and a few thousand lines of code.

# Outside Work

To be honest, I didn't have much work life balance that summer. I'd get into the office as early as possible, do a workout, and hit my desk working all the way until dinner at 6pm. I'd get home at 7pm, which is crazy because I'd usually leave at 7am in the morning. This means I was out for 12 hours a day, mostly doing work. I also never took a single remote day.

Even after coming back to my apartment, I'd get back on leetcode and read [OSTEP](https://pages.cs.wisc.edu/~remzi/OSTEP/) to prepare for the next recruiting season. I was exhausted everyday, and I'm sure that if this continued for any longer, I would've been permanently burned out. This is something I am keeping in mind for when I actually start a new grad job. If I burn myself out as a new grad, then there won't be many chances to refresh myself.

I remember the first few weeks I'd come back so exhausted I couldn't leave my bed. I'd try my best to digest the operating systems textbook while my muscles were fully non-functional. My body eventually got used to it, and I stopped feeling so exhausted, but I realize that everyone has their limits.

I honestly didn't meet that many interns. I knew there were groups of interns that did trips together or had fun after work. I barely did any of that. I was both caught up in so much work as well as isolated from most of the interns due to my office location. There wasn't much opportunity to meet people either, and all the interns lived pretty sparsly.

I did go hiking and biking a few times. In fact, one of my favorite parts about the internship is the intern bike program. They give all interns a bike to use over summer as long as you watch a training video. I didn't have a car for the internship (which was also probably why the internship was so socially dead), so I'd use my bike to get groceries and sometimes get to work.

I did however find out I like the Bay Area. Living in Illinois the past 4 years makes me appreciate any ray of sunshine you can get, and the Bay Area has an infinite supply. When I was looking for new grad positions, I pretty much only focused on the Bay. The food is also really good.

# The Pros

This is gonna end up mostly like a list, but here it goes:
- Convenience. Everything from housing, to transportation, to food is covered. I didn't have to spend a dime on it (except food on the weekends). The corporate housing was super nice (it was 6k a month I think) and I had a roommate, we had seperate rooms and bathrooms. A bunch of cooking wear, towels, and household appliances were procvided too. I was also put in downtown mountain view, perfect cause it was right next to Castro Street and the Caltrain. In terms of transporation, the intern bike program was great and I also received free funds to use for the Caltrain. Food at Meta was also good, especially the desserts.
- Interesting Work. Each intern fills out a preference sheet before the internship and they get matched to a team based on it. I remember selecting that I was interested in compilers, despite having no experience in it. I'm glad that I was indeed matched with a compilers team.
- Tooling. If I never use it again, I'm going to miss this a lot: Meta tooling is top tier. I massively prefer using sapling compared to git for version control now. Meta's tooling infrastructure allows engineers to build fast without blockage. I don't think I have ever been able to submit so much code in the first week of an internship, I spend most of the time waiting for access. Like I mentioned, this is what sets Meta apart. "Move fast and break things".
- Feedback. Meta is all about feedback, and I'm all for that. Each diff needs at least one other reviewer, and I got so much feedback on the quality of my code. I'm sure that the internship has made me a better software engineer because of it. The feedback from calibration and the weekly 1:1s with my manager were also super useful.
- Team. Meta supports team onsites and team building events. I went sailing with my team for an onsite during the summer, and it was really fun and definetly makes the team bond better. I haven't seen this at any other company, but I think its important for teams to work together on subjects that are not work as well.
- Events. Meta has some intern social events, such as an arcade night, a Santa Cruz boardwalk trip, and a campfire on campus. I wish there were more events, especially considering that my previous internships had way more. There were also a lot of tech talks and learning events.

# The Cons

This is also a list:
- Stress. I was never more stress and exhausted during an internship. I usually treat internships like a break, because after work I don't have homework to do like in school. But this internship was probably as stressful as school, if not worse. This lead to severe burnout when I got back to college after the internship, since it meant that I didn't take a single break since the beginning of 2025 (all the way until the end of 2025).
- Limited Impact. This is one of my largest issues with working at FAANG. There are so many engineers and so many fleshed out products that most people end up working on maintence of small extra features for the products. At least from what I've seen, its hard to start and own a project from scratch at these companies. Working at a smaller company gives this advantage. Ultimately, I think this is a large part of why I think growing at Meta is not as effective as growing at smaller companies.
- Team Luck. Unfortunetly, some of my fellow interns were not as lucky as me with their team. Some of them had negligent managers, which impacted their rating.
- Calibration. Similar to stress, I think calibration is a very large con of working at Meta. I understand its what keeps the company running, but I think for employee happiness, this is truly not helpful at all.

# Overall

I enjoyed the internship experience, and learned a lot, despite being exhausted all the time. I think if you want to be a successful software engineer, going to Meta is a great choice. But for me, I think there is much more than just being a software engineer, my goal is grow as much as possible in both engineering and leadership abilities. I want to eventually lead large projects and design solutions to difficult problems at scale. At FAANG companies, I am skeptical how much of this is possible, given the size and bureaucracy. 

A lot of people used to have the "FAANG" dream: the dream where you work at one of these tech companies and live a chill life. The dream is now dead, these companies no longer have cushy lifestyles and will fire easily when things go bad. There is no stability in tech anymore, and this may be here to stay. In my opinion, if you want to outlast the competition, you cannot just be an average software engineer. I feel like there are many avenues for this, one is working at a smaller company. The other is to make your own startup. Either way, I believe 90% of engineers will end up in a dead end at FAANG.

If you still believe in the FAANG dream, its time to wake up. 

{{< center >}}

{{< lightimg src="images/meta/metalogo.jpg" alt="Meta Logo" caption="The Meta Logo in the Menlo Park Office" >}}

{{< /center >}}
