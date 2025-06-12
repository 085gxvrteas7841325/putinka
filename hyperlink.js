console.log('https://discord.gg/TGKETWvRwV');
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('originalLink');
  const button = document.getElementById('bypassBtn');
  const status = document.getElementById('statusMsg');

async function shorten(link) {
  const apiUrl = 'https://spoo.me';
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      url: link
    }),
  });
  if (!response.ok) throw new Error('Shorten API failed');
  const json = await response.json();
  if (!json.short_url) throw new Error('Invalid response');
  return json.short_url;
}

  function format(linkType, shortLink) {
    switch (linkType) {
      case 'users':
        return `[httрѕ*:*//www.roblox.com/users/7809274722/profile](${shortLink})`;
      case 'games':
        return `[httрѕ*:*//www.roblox.com/share?code=116562041fd4d54681b915675dd54767&type=Server](${shortLink})`;
      case 'groups':
        return `[httрѕ*:*//www.roblox.com/groups/7809274722](${shortLink})`;
      default:
        return `[Link](${shortLink})`;
    }
  }

  function detectType(link) {
    if (/\/users\//.test(link)) return 'users';
    if (/\/games\//.test(link)) return 'games';
    if (/\/groups\//.test(link)) return 'groups';
    return 'other';
  }

  function neonToast(msg) {
    status.textContent = msg;
    status.className = 'toast';
    setTimeout(() => status.className = 'toast hide', 3000);
  }

  button.addEventListener('click', async () => {
    const original = input.value.trim();
    if (!original) {
      neonToast('Please paste a link first.');
      return;
    }
    try {
      const shortLink = await shorten(original);
      const type = detectType(original);
      const formatted = format(type, shortLink);
      await navigator.clipboard.writeText(formatted);
      neonToast('Hyperlink copied to clipboard!');
    } catch (err) {
      console.error(err);
      neonToast('Failed to shorten/copy link.');
    }
  });
});
