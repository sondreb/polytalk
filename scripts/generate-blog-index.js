const fs = require('fs').promises;
const path = require('path');

async function generateBlogIndex() {
    const blogDir = path.join(__dirname, '../src/assets/blog');
    const posts = [];

    try {
        const files = await fs.readdir(blogDir);
        console.log(`Found ${files.length} files in blog directory`);
        
        for (const file of files) {
            if (file.endsWith('.md')) {
                console.log(`Processing ${file}...`);
                const content = await fs.readFile(path.join(blogDir, file), 'utf8');
                const frontMatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
                
                if (frontMatterMatch) {
                    const frontMatter = frontMatterMatch[1]
                        .split('\n')
                        .filter(line => line.trim() !== '') // Skip empty lines
                        .reduce((acc, line) => {
                            const [key, ...values] = line.split(':');
                            if (key && values.length) {
                                let value = values.join(':').trim();
                                // Parse tags array if present
                                if (key.trim() === 'tags' && value.startsWith('[')) {
                                    try {
                                        value = JSON.parse(value.replace(/'/g, '"'));
                                    } catch (e) {
                                        console.warn(`Warning: Could not parse tags in ${file}`);
                                        value = [];
                                    }
                                }
                                acc[key.trim()] = value;
                            }
                            return acc;
                        }, {});

                    if (!frontMatter.title || !frontMatter.date) {
                        console.warn(`Warning: ${file} is missing required frontmatter (title or date)`);
                    }

                    posts.push({
                        title: frontMatter.title || path.basename(file, '.md'),
                        date: frontMatter.date || new Date().toISOString(),
                        description: frontMatter.description || '',
                        tags: frontMatter.tags || [],
                        featured_image: frontMatter.featured_image || '',
                        file: file
                    });
                    console.log(`Added ${file} to index`);
                } else {
                    console.warn(`Warning: ${file} has no valid frontmatter`);
                }
            } else {
                console.log(`Skipping non-markdown file: ${file}`);
            }
        }

        // Sort posts by date (newest first)
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        console.log(`\nTotal posts processed: ${posts.length}`);
        console.log('Writing posts.json...');

        await fs.writeFile(
            path.join(blogDir, 'posts.json'),
            JSON.stringify(posts, null, 2)
        );

        console.log('Successfully generated posts.json with the following entries:');
        console.log(JSON.stringify(posts, null, 2));
    } catch (error) {
        console.error('Error generating blog index:', error);
        process.exit(1);
    }
}

generateBlogIndex();
