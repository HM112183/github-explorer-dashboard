const GITHUB_API_BASE_URL = 'https://api.github.com';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN; // Accessing the environment variable

const headers = {
  'Accept': 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'Authorization': GITHUB_TOKEN ? `token ${GITHUB_TOKEN}` : '' // Only add if token exists
};

export const fetchTrendingRepositories = async (
  language = '',
  sortBy = 'stars',
  order = 'desc',
  createdSince = '2024-06-01', // Example: Repos created since June 1st, 2024
  page = 1,
  perPage = 20,
  query = '' // For general search
) => {
  let queryString = `q=created:>${createdSince}`;

  if (language) {
    queryString += `+language:${encodeURIComponent(language)}`;
  }
  if (query) {
    queryString += `+${encodeURIComponent(query)}`;
  }

  const url = `${GITHUB_API_BASE_URL}/search/repositories?${queryString}&sort=${sortBy}&order=${order}&page=${page}&per_page=${perPage}`;

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      // Handle rate limit or other API errors
      const errorData = await response.json();
      throw new Error(`GitHub API error: ${response.status} - ${errorData.message}`);
    }
    const data = await response.json();
    return data.items; // Array of repository objects
  } catch (error) {
    console.error('Error fetching trending repositories:', error);
    throw error;
  }
};

export const fetchRepositoryDetails = async (owner, repoName) => {
  try {
    const response = await fetch(`${GITHUB_API_BASE_URL}/repos/${owner}/${repoName}`, { headers });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`GitHub API error: ${response.status} - ${errorData.message}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching details for ${owner}/${repoName}:`, error);
    throw error;
  }
};

// You can add more API calls for contributions, issues, etc.
// Example: Fetch contributors
export const fetchRepositoryContributors = async (owner, repoName) => {
  try {
    const response = await fetch(`${GITHUB_API_BASE_URL}/repos/${owner}/${repoName}/contributors`, { headers });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`GitHub API error: ${response.status} - ${errorData.message}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching contributors for ${owner}/${repoName}:`, error);
    throw error;
  }
};

// Example: Fetch issues
export const fetchRepositoryIssues = async (owner, repoName) => {
    try {
      const response = await fetch(`${GITHUB_API_BASE_URL}/repos/${owner}/${repoName}/issues?state=all`, { headers });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`GitHub API error: ${response.status} - ${errorData.message}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching issues for ${owner}/${repoName}:`, error);
      throw error;
    }
  };