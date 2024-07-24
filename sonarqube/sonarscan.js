const scanner = require('sonarqube-scanner').default;

scanner(
    {
        serverUrl: 'http://localhost:8000/',
        token: "sqp_639beed3b6a3dd905d1072d9577cf70b0511dbc9",
        options: {
            'sonar.projectName': 'Pokedex',
            'sonar.projectDescription': 'Here I can add a description of my project',
            'sonar.projectKey': 'Pokedex',
            'sonar.projectVersion': '0.0.1',
            'sonar.exclusions': '',
            'sonar.sourceEncoding': 'UTF-8',
        }
    },
    error => {
        if (error) {
            console.error(error);
        }
        process.exit();
    },
)
