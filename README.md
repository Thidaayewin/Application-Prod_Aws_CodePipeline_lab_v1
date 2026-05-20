# Application Prod AWS CodePipeline Lab v1

Simple Node.js sample application for AWS Elastic Beanstalk and AWS CodePipeline deployment practice.

## Files
- `app.js` - Node.js web server
- `index.html` - sample web page
- `package.json` - start script
- `cron.yaml` - Elastic Beanstalk scheduled task

## Run Locally
```bash
npm install
npm start
```

Open:
```browser
http://localhost:3000
```

## AWS Deployment

This project can be deployed using AWS CodePipeline with Elastic Beanstalk.

Basic flow:

1. Push code to GitHub.
2. CodePipeline pulls the source code.
3. CodePipeline deploys to Elastic Beanstalk.
4. Elastic Beanstalk runs the app with `npm start`.

## Repository

```text
https://github.com/Thidaayewin/Application-Prod_Aws_CodePipeline_lab_v1
```
