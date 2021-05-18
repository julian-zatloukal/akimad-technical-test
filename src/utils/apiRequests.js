const ghApiUrl = "https://api.github.com";

export const queryUsername = async (username, page) => {
  try {
    let response = await fetch(`${ghApiUrl}/search/users?q=${username}&page=${page}`);

    if (response.ok) {
      let formattedResponse = await response.json();
      return formattedResponse;
    }
  } catch (ex) {
    throw Error("GitHub API connection error");
  }
};

export const getUserDetails = async (username) => {
  try {
    let details = await fetch(`${ghApiUrl}/users/${username}`);

    let orgs = await fetch(`${ghApiUrl}/users/${username}/orgs`);

    let repos = await fetch(`${ghApiUrl}/users/${username}/repos`);

    if (orgs.ok && repos.ok && details.ok) {
      let formattedDetails = await details.json();
      let formattedOrgs = await orgs.json();
      let formattedRepos = await repos.json();
      return {
        detailed: formattedDetails,
        orgs: formattedOrgs,
        repos: formattedRepos
      };
    }
  } catch (ex) {
    throw Error("GitHub API connection error");
  }
};

