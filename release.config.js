const config = {
  branches: ['master'],
  tagFormat: '${version}',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      "@google/semantic-release-replace-plugin",
      {
        "replacements": [
          {
            "files": ["manifest.json"],
            "from": "\"version\" : \".*\"",
            "to": "\"version\" : \"${nextRelease.version}\"",
            "results": [
              {
                "file": "manifest.json",
                "hasChanged": true,
                "numMatches": 1,
                "numReplacements": 1
              }
            ],
            "countMatches": true
          },
          {
            "files": ["build/manifest.json"],
            "from": "\"version\" : \".*\"",
            "to": "\"version\" : \"${nextRelease.version}\"",
            "results": [
              {
                "file": "build/manifest.json",
                "hasChanged": true,
                "numMatches": 1,
                "numReplacements": 1
              }
            ],
            "countMatches": true
          },
        ]
      }
    ],
    // ["@semantic-release/npm", {
    //   "npmPublish": false,
    //   "tarballDir": false,
    // }],
    ["@semantic-release/git", {
      "assets": ["manifest.json"],
      "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
    }],
    ["@semantic-release/github", {
      "assets": ["build/manifest.json","build/main.js","build/main.css"]
    }]
  ]
};

module.exports = config;