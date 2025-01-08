
import HomeScreen from "../src/screen/HomeScreen.js";
import ProductScreen from "../src/screen/ProductScreen.js";
import Error404Screen from "../src/screen/Error404Screen.js";
import { parseRequestURL } from "../src/utils/utils.js";
import CartScreen from "../src/screen/CartScreen.js";
import registerAndLoginScreen from "../src/screen/registerAndLogin.js";
import Header from "./auth.js";



const routes={
  '/': HomeScreen,
  '/product/:id': ProductScreen,
  '/cart': CartScreen,
  '/404': Error404Screen,
  '/land': registerAndLoginScreen,
}

const renderHeader = async () => {
  const headerContainer = document.querySelector('header div#header-actions');
  headerContainer.innerHTML = Header.render();
  await Header.after_render();
};

const router = async()=>{
  console.log('router called');
  const request = parseRequestURL();
  console.log(request);
  const parseURL = 
    (request.resource ? `/${request.resource}` : '/')+
    (request.id ? '/:id' : '')+
    (request.verb? `/${request.verb}` : '');
  
  
  const matchedRoute = Object.keys(routes).find((route) => {
    const dynamicRouteRegex = new RegExp(`^${route.replace(':id', '[^/]+')}$`);
    return dynamicRouteRegex.test(parseURL);
  });
  
  const screen = matchedRoute ? routes[matchedRoute] : Error404Screen;
  console.log('Matched route:', matchedRoute);
  const mainContainer = document.getElementById('main-container');
  if(!mainContainer){
    console.log('mainContainer not found');
    return;
  }
  mainContainer.innerHTML = await screen.render();
  if (screen.after_render) await screen.after_render();

}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
window.addEventListener('load', renderHeader);
window.addEventListener('hashchange', renderHeader);