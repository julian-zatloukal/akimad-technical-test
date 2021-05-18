const ghApiUrl = "https://api.github.com";

export const queryUsername = async (username) => {
  try {
    let response = await fetch(`${ghApiUrl}/search/users?q=${username}`,{
      headers: {
        Authorization: `Basic ${btoa(process.env.GH_USER + ":" + process.env.GH_TOKEN )}`
      }
    });

    if (response.ok) {
      let formattedResponse = await response.json();
      return formattedResponse.items;
    } else {
      throw Error("GitHub API failed request");
    }
  } catch (ex) {
    throw Error("GitHub API connection error");
  }
};

export const getUserDetails = async (username) => {
  try {
    let details = await fetch(`${ghApiUrl}/users/${username}`, {
      headers: {
        Authorization: `Basic ${btoa(process.env.GH_USER + ":" + process.env.GH_TOKEN )}`
      }
    });

    let orgs = await fetch(`${ghApiUrl}/users/${username}/orgs`, {
      headers: {
        Authorization: `Basic ${btoa(process.env.GH_USER + ":" + process.env.GH_TOKEN )}`
      }
    });

    let repos = await fetch(`${ghApiUrl}/users/${username}/repos`, {
      headers: {
        Authorization: `Basic ${btoa(process.env.GH_USER + ":" + process.env.GH_TOKEN )}`
      }
    });

    if (orgs.ok && repos.ok && details.ok) {
      let formattedDetails = await details.json();
      let formattedOrgs = await orgs.json();
      let formattedRepos = await repos.json();
      return {
        detailed: formattedDetails,
        orgs: formattedOrgs,
        repos: formattedRepos
      };
    } else {
      throw Error("GitHub API failed request");
    }
  } catch (ex) {
    throw Error("GitHub API connection error");
  }
};

