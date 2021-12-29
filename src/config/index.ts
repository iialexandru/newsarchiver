const dev: boolean = process.env.NODE_ENV !== 'production';

export const server: string = dev ? 'http://localhost:9000' : 'https://newsarchived.herokuapp.com/'