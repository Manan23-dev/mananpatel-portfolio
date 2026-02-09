// LeetCode Stats Integration
// Configure your LeetCode username here
const LEETCODE_USERNAME = 'manan_2301'; // Change this to your LeetCode username

// LeetCode GraphQL endpoint
const LEETCODE_API = 'https://leetcode.com/graphql/';

// GraphQL query to fetch user stats
const LEETCODE_QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      username
      profile {
        ranking
        userAvatar
        realName
      }
      submitStats {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
        totalSubmissionNum {
          difficulty
          count
          submissions
        }
      }
    }
  }
`;

async function fetchLeetCodeStats() {
    try {
        const response = await fetch(LEETCODE_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: LEETCODE_QUERY,
                variables: { username: LEETCODE_USERNAME }
            })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch LeetCode stats');
        }

        const data = await response.json();
        
        if (data.errors) {
            console.error('LeetCode API errors:', data.errors);
            return null;
        }

        return data.data.matchedUser;
    } catch (error) {
        console.error('Error fetching LeetCode stats:', error);
        return null;
    }
}

function displayLeetCodeStats(userData) {
    if (!userData) {
        // Hide the section if data can't be fetched
        const leetcodeSection = document.getElementById('leetcode-stats');
        if (leetcodeSection) {
            leetcodeSection.style.display = 'none';
        }
        return;
    }

    const stats = userData.submitStats.acSubmissionNum;
    const totalSolved = stats.find(s => s.difficulty === 'All')?.count || 0;
    const easySolved = stats.find(s => s.difficulty === 'Easy')?.count || 0;
    const mediumSolved = stats.find(s => s.difficulty === 'Medium')?.count || 0;
    const hardSolved = stats.find(s => s.difficulty === 'Hard')?.count || 0;
    const ranking = userData.profile?.ranking || null;

    // Update the stats display
    const totalElement = document.getElementById('leetcode-total');
    const easyElement = document.getElementById('leetcode-easy');
    const mediumElement = document.getElementById('leetcode-medium');
    const hardElement = document.getElementById('leetcode-hard');
    const rankingElement = document.getElementById('leetcode-ranking');

    if (totalElement) totalElement.textContent = totalSolved;
    if (easyElement) easyElement.textContent = easySolved;
    if (mediumElement) mediumElement.textContent = mediumSolved;
    if (hardElement) hardElement.textContent = hardSolved;
    if (rankingElement && ranking) {
        rankingElement.textContent = `#${ranking.toLocaleString()}`;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    const leetcodeSection = document.getElementById('leetcode-stats');
    if (leetcodeSection) {
        const userData = await fetchLeetCodeStats();
        displayLeetCodeStats(userData);
    }
});
