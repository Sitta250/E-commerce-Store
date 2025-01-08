export const parseRequestURL = () =>{
  const url = window.location.hash.toLocaleLowerCase();
  const request = url.split('/');
  return{
    resource : request[1],
    id : request[2],
    verb : request[3]
  };
};
