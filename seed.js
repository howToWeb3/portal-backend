import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Seed data for User model
    const users = [
        { address: 'rPjjyCoEzcymxuXBBPfA9w7TrMAFzTeXk6' },
        { address: 'rDie5b6cPYndCjxjeisM1BmpYMonqvBwAn' },
        { address: 'rXMART8usFd5kABXCayoP6ZfB35b4v43t' },
    ];

    // Seed data for Collection model
    const collections = [
        {
            name: 'Collection 1',
            description: 'This is the first collection',
            image: 'ipfs://bafybeigqtp6arogsjxkri46xjvtvyg3faqix2qluyxcsbxqcseo32suebi/7201.png',
        },
        {
            name: 'Collection 2',
            description: 'This is the second collection',
            image: 'ipfs://bafybeigqtp6arogsjxkri46xjvtvyg3faqix2qluyxcsbxqcseo32suebi/7201.png',
        },
        {
            name: 'Collection 3',
            description: 'This is the third collection',
            image: 'ipfs://bafybeigqtp6arogsjxkri46xjvtvyg3faqix2qluyxcsbxqcseo32suebi/7201.png',
        },
    ];

    // Seed data for NFT model
    const nfts = [
        {
            metadata: {
                name: 'HappyCat #7201',
                description: '10k very cute and loveable HappyCats just waiting to find a new home!',
                image: 'ipfs://bafybeigqtp6arogsjxkri46xjvtvyg3faqix2qluyxcsbxqcseo32suebi/7201.png',
                alternative_sources: {
                    image: [
                        'https://arweave.net/tWCOSU4LiN9Icnk399DKq6etoeJUtvmFU9mEc5rmlJw/7201.png',
                    ],
                },
                attributes: [
                    {
                        trait_type: 'Background',
                        value: 'Red',
                    },
                    // ... other attributes
                ],
            },
            name: 'HappyCat #7201',
            description: '10k very cute and loveable HappyCats just waiting to find a new home!',
            image: 'ipfs://bafybeigqtp6arogsjxkri46xjvtvyg3faqix2qluyxcsbxqcseo32suebi/7201.png',
            tags: [
                'tag1',
                'tag2',
            ],
        },
        {
            metadata: { name: 'NFT 2', description: 'This is the second NFT' },
            tags: [
                'tag2',
                'tag3',
            ],
            name: 'NFT 2',
            description: 'This is the second NFT',
            image: 'ipfs://bafybeigqtp6arogsjxkri46xjvtvyg3faqix2qluyxcsbxqcseo32suebi/7201.png',
        },
        {
            metadata: { name: 'NFT 3', description: 'This is the third NFT' },
            tags: [
                'tag1',
                'tag3',
            ],
            name: 'NFT 3',
            description: 'This is the third NFT',
            image: 'ipfs://bafybeigqtp6arogsjxkri46xjvtvyg3faqix2qluyxcsbxqcseo32suebi/7201.png',
        },
    ];

    // Seed data for FeaturedNFTCollection model
    const featuredNFTCollections = [
        { rank: 1, collectionId: 1 },
        { rank: 2, collectionId: 2 },
        { rank: 3, collectionId: 3 },
    ];

    // Seed data for TrendingNFTCollection model
    const trendingNFTCollections = [
        { rank: 1, collectionId: 1 },
        { rank: 2, collectionId: 2 },
        { rank: 3, collectionId: 3 },
    ];

    // Insert seed data
    const createdUsers = await Promise.all(users.map(user => prisma.user.create({ data: user })));
    const createdCollections = await Promise.all(
        collections.map(collection => prisma.collection.create({ data: collection })),
    );

    // Associate NFTs with users and collections
    const nftsWithRelations = nfts.map((nft, index) => ({
        ...nft,
        ownerId: createdUsers[index % createdUsers.length].id,
        collectionId: createdCollections[index % createdCollections.length].id,
    }));

    await Promise.all(nftsWithRelations.map(nft => prisma.nFT.create({ data: nft })));
    await prisma.featuredNFTCollection.createMany({ data: featuredNFTCollections });
    await prisma.trendingNFTCollection.createMany({ data: trendingNFTCollections });
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
