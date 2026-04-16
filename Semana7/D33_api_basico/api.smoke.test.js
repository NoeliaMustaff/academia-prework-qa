import axios from 'axios';
import assert from 'node:assert/strict';

const baseUrl = 'https://jsonplaceholder.typicode.com/posts/1';

async function getPosts1() 
{
    try 
    {
        const response = await axios.get(baseUrl);
        const statusCode = response.status;
        const responseBody = response.data;

        console.log('[GET /posts/1] statusCode:', statusCode);
        console.log('[GET /posts/1] responseBody:', responseBody);

        assert.equal(statusCode, 200);
        assert.equal(typeof responseBody, 'object');
        assert.equal(typeof responseBody.userId, 'number');
        assert.equal(typeof responseBody.id, 'number');
        assert.equal(typeof responseBody.title, 'string');
        assert.equal(typeof responseBody.body, 'string');
    
    } 
    catch (error) 
    {
        console.error('[GET /posts/1] Falló');
        if (error?.response) 
            {
                console.error('status:', error.response.status);
                console.error('data:', error.response.data);
            }
        throw error;
    }
}

async function postPosts()
{
    const requestUrl = 'https://jsonplaceholder.typicode.com/posts';

    try
    {
        const response = await axios.post(requestUrl);
        const statusCode = response.status;
        const responseBody = response.data;

        console.log('[POST /posts] statusCode:', statusCode);
        console.log('[POST /posts] responseBody:', responseBody);

        assert.equal(statusCode, 201);
        assert.equal(typeof responseBody, 'object');
        assert.equal(typeof responseBody.id, 'number');

    } 
    catch (error)
    {
        console.error('[POST /posts] Falló');
        if (error?.response) 
            {
                console.error('status:', error.response.status);
                console.error('data:', error.response.data);
            }
        throw error;
    }
}


async function putPosts1() 
{
    try 
    {
        const response = await axios.put(baseUrl);
        const statusCode = response.status;
        const responseBody = response.data;

        console.log('[PUT /posts/1] statusCode:', statusCode);
        console.log('[PUT /posts/1] responseBody:', responseBody);

        assert.equal(statusCode, 200);
        assert.equal(typeof responseBody, 'object');
        assert.equal(typeof responseBody.id, 'number');
    } 
    catch (error) 
    {
        console.error('[PUT /posts/1] Falló');
        if (error?.response) 
            {
                console.error('status:', error.response.status);
                console.error('data:', error.response.data);
            }
        throw error;
    }
}

async function deletePosts1()
{
    try 
    {
        const response = await axios.delete(baseUrl);
        const statusCode = response.status;
        const responseBody = response.data;

        console.log('[DELETE /posts/1] statusCode:', statusCode);
        console.log('[DELETE /posts/1] responseBody:', responseBody);

        assert.equal(statusCode, 200);
        assert.equal(typeof responseBody, 'object');
        assert.equal(Object.keys(responseBody).length, 0);
    
    } 
    catch (error) 
    {
        console.error('[DELETE /posts/1] Falló');
        if (error?.response) 
            {
                console.error('status:', error.response.status);
                console.error('data:', error.response.data);
            }
        throw error;
    }
}

await getPosts1();
await postPosts();
await putPosts1();
await deletePosts1();