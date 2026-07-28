/**
 * Parses a raw markdown string to extract YAML-like frontmatter and body content.
 */
export function parseMarkdown(mdText) {
  if (!mdText) return { metadata: {}, content: '' };
  
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---/;
  const match = mdText.match(frontmatterRegex);
  const metadata = {};
  let content = mdText;
  
  if (match) {
    content = mdText.replace(frontmatterRegex, '').trim();
    const yamlLines = match[1].split('\n');
    yamlLines.forEach(line => {
      const separatorIdx = line.indexOf(':');
      if (separatorIdx > 0) {
        const key = line.substring(0, separatorIdx).trim();
        let value = line.substring(separatorIdx + 1).trim();
        // Remove surrounding quotes
        value = value.replace(/^['"]|['"]$/g, '');
        metadata[key] = value;
      }
    });
  }
  
  return { metadata, content };
}

/**
 * Loads all content dynamically from the src/content directory using Vite's eager glob import.
 */
export function loadPortfolioData() {
  // Eager load all markdown files under src/content
  const bioModules = import.meta.glob('../content/bio.md', { query: '?raw', eager: true });
  const worksModules = import.meta.glob('../content/works/*.md', { query: '?raw', eager: true });
  const archiveModules = import.meta.glob('../content/archive/*.md', { query: '?raw', eager: true });

  // 1. Parse Bio Data
  let bio = {
    name: 'Akio Hiroshi',
    tagline: "Hi, I'm Akio, a japanse brand designer that loves to experiment",
    description: 'Product designer, specializing in crafting user-friendly products...',
    email: 'INFO@AKIO.DESIGN',
    socials: {}
  };
  let experiences = [];

  const bioPath = '../content/bio.md';
  if (bioModules[bioPath]) {
    const rawText = bioModules[bioPath].default;
    const { metadata, content } = parseMarkdown(rawText);
    
    bio = {
      name: metadata.name || bio.name,
      tagline: metadata.tagline || bio.tagline,
      description: metadata.description || bio.description,
      email: metadata.email || bio.email,
      socials: {
        instagram: metadata.instagram || 'https://instagram.com',
        behance: metadata.behance || 'https://behance.net',
        twitter: metadata.twitter || 'https://twitter.com',
        dribbble: metadata.dribbble || 'https://dribbble.com'
      }
    };

    // Parse experiences from content list
    // Format: - 2019 | Design Intern | Luxe Brands
    experiences = content.split('\n')
      .map(line => line.trim())
      .filter(line => line.startsWith('-'))
      .map(line => {
        const parts = line.replace(/^- /, '').split('|').map(s => s.trim());
        return {
          year: parts[0] || '',
          role: parts[1] || '',
          company: parts[2] || ''
        };
      });
  }

  // 2. Parse Selected Works Data
  const works = Object.keys(worksModules).map(path => {
    const rawText = worksModules[path].default;
    const { metadata, content } = parseMarkdown(rawText);
    
    return {
      id: metadata.id || path.split('/').pop().replace('.md', ''),
      title: metadata.title || '',
      category: metadata.category || '',
      year: metadata.year || '',
      overview: metadata.overview || '',
      role: metadata.role ? metadata.role.split('\\n').map(s => s.trim()) : [],
      services: metadata.services ? metadata.services.split('\\n').map(s => s.trim()) : [],
      about: metadata.about || '',
      placeholder: metadata.placeholder || '',
      content: content
    };
  });

  // Sort works by year desc or id (we can keep a custom sorting if needed, e.g. n1-widgets, h23, glod-water)
  const orderMap = { 'n1-widgets': 1, 'h23': 2, 'glod-water': 3 };
  works.sort((a, b) => (orderMap[a.id] || 99) - (orderMap[b.id] || 99));

  // 3. Parse Archive Data
  const archive = Object.keys(archiveModules).map(path => {
    const rawText = archiveModules[path].default;
    const { metadata, content } = parseMarkdown(rawText);
    
    return {
      title: metadata.title || '',
      category: metadata.category || '',
      year: metadata.year || '',
      placeholder: metadata.placeholder || '',
      content: content
    };
  });

  // Sort archive items by year desc
  archive.sort((a, b) => parseInt(b.year) - parseInt(a.year));

  return { bio, experiences, works, archive };
}
