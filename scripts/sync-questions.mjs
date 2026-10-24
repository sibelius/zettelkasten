// Questions people ask on GitHub Discussions (Q&A), with my answers, into src/data/questions.json.
// Runs in CI before every build, so a new answer shows up on the site when it is marked as the answer.
import {writeFileSync} from 'node:fs';

const OWNER = 'sibelius';
const REPO = 'zettelkasten';
const CATEGORY = 'Q&A';

const token = process.env.GITHUB_TOKEN;

if (!token) {
  console.log('questions: no GITHUB_TOKEN, keeping src/data/questions.json as it is');
  process.exit(0);
}

const query = `query($owner: String!, $repo: String!, $after: String) {
  repository(owner: $owner, name: $repo) {
    discussionCategories(first: 25) { nodes { id name } }
    discussions(first: 100, after: $after, orderBy: {field: CREATED_AT, direction: DESC}) {
      pageInfo { hasNextPage endCursor }
      nodes {
        title url createdAt upvoteCount
        category { name }
        author { login }
        bodyText
        comments { totalCount }
        answer { bodyHTML createdAt author { login } }
      }
    }
  }
}`;

async function graphql(variables) {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {authorization: `Bearer ${token}`, 'content-type': 'application/json'},
    body: JSON.stringify({query, variables}),
  });
  const body = await response.json();

  if (body.errors) {
    throw new Error(body.errors.map((error) => error.message).join(', '));
  }

  return body.data.repository;
}

const discussions = [];
let after = null;

do {
  const repository = await graphql({owner: OWNER, repo: REPO, after});
  discussions.push(...repository.discussions.nodes);
  after = repository.discussions.pageInfo.hasNextPage ? repository.discussions.pageInfo.endCursor : null;
} while (after);

const questions = discussions
  .filter((discussion) => discussion.category.name === CATEGORY)
  .map((discussion) => ({
    title: discussion.title,
    url: discussion.url,
    date: discussion.createdAt.slice(0, 10),
    asker: discussion.author?.login ?? 'ghost',
    question: discussion.bodyText.slice(0, 600),
    votes: discussion.upvoteCount,
    comments: discussion.comments.totalCount,
    answer: discussion.answer
      ? {html: discussion.answer.bodyHTML, date: discussion.answer.createdAt.slice(0, 10), by: discussion.answer.author?.login ?? 'ghost'}
      : null,
  }));

writeFileSync('src/data/questions.json', `${JSON.stringify(questions, null, 2)}\n`);
console.log(`questions: ${questions.length}, ${questions.filter((q) => q.answer).length} answered`);
