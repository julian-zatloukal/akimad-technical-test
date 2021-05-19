const ghApiUrl = "https://api.github.com";

export const queryUsername = async (username, page) => {
  try {
    var response = await fetch(
      `${ghApiUrl}/search/users?q=${username}&page=${page}`
    );
  } catch (ex) {
    throw Error("GitHub API connection error");
  }

  if (response.ok) {
    try {
      var formattedResponse = await response.json();
      return formattedResponse;
    } catch (ex) {
      throw Error("Unable to process server response");
    }
  } else {
    throw Error("GitHub API limit reached");
  }
};

export const getUserDetails = async (username) => {
  try {
    var details = await fetch(`${ghApiUrl}/users/${username}`);

    var orgs = await fetch(`${ghApiUrl}/users/${username}/orgs`);

    var repos = await fetch(`${ghApiUrl}/users/${username}/repos`);
  } catch (ex) {
    throw Error("GitHub API connection error");
  }

  if (orgs.ok && repos.ok && details.ok) {
    try {
      let formattedDetails = await details.json();
      let formattedOrgs = await orgs.json();
      let formattedRepos = await repos.json();
      return {
        detailed: formattedDetails,
        orgs: formattedOrgs,
        repos: formattedRepos,
      };
    } catch (ex) {
      throw Error("Unable to process server response");
    }
  } else {
    throw Error("GitHub API limit reached");
  }
};
