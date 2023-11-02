## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API conventions

### API response

```javascript
{
    data:{
        message:success or error message
        payload:data
    }
    status:{//not json
        200: Success
        400: Bad Request
        409: User/Data lready exists
        469: Token invalid or expired
        500: Server Failure

    }
}
```
