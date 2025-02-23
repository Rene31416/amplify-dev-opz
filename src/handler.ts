export const handler  = () =>{
    console.log('hey this is the testing lambda')
    console.log(`this is the secret value retrieved ${JSON.stringify(process.env.SECRET_VALUE)}`)
}