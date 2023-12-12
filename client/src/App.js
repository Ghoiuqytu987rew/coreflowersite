import {Navigate, Route, Routes} from "react-router";
import {Admin, User} from "./layOuts";
import {
    AllPlantsPage,
    ContactsPage,
    AllPlansUserPage,
    SearchPage,
    PlantsCardPage,
    BuyItemPage, SignUpPage, UserPage, ForSellPage, NewItemPage, MassengesPage, NotFoundPage, UsersMPage
} from "./pages";
import {AddNewPlants, ContactComponent, MessageDel, MessagesFromUser} from "./components";
import { OrdersById } from "./components/ordersById/ordersById";
import {Ssl} from "./components/ssl";

function App() {
  return (
    <div>
      <Routes>
        <Route path={"message"} element={<MassengesPage/>}/>
        <Route path={"messageDel"} element={<MessageDel/>}/>
        <Route path={"/.well-known/pki-validation/"} element={<Ssl/>}/>
          <Route path={"/"} element={<User/>}>
              <Route path={"allPlants"} element={<AllPlansUserPage/>}/>
              <Route path={"plantsCardPage"} element={<PlantsCardPage/>}/>
              <Route path={"buyItemPage"} element={<BuyItemPage/>}/>
              <Route path={"contacts"} element={<ContactsPage/>}/>
              <Route path={"search"} element={<SearchPage/>}/>
              <Route path={"signUp"} element={<SignUpPage/>}/>
              <Route path={"userPage"} element={<UserPage/>}>
                  <Route path={"myOrders"} element={<OrdersById/>}/>
                  <Route path={"contact"} element={<ContactComponent/>}/>
              </Route>
              <Route path={"forSell"} element={<ForSellPage/>}/> 
              <Route path={"new"} element={<NewItemPage/>}/> 
              <Route path={""} element={<NewItemPage/>}/> 
          </Route>
              <Route path={"admin"} element={<Admin/>}>
                  <Route path={"addNewPlants"} element={<AddNewPlants/>}/>
                  <Route path={"allPlants"} element={<AllPlantsPage/>}/>
                  <Route path={"message"} element={<MessagesFromUser/>}/>
                  <Route path={"users"} element={<UsersMPage/>}>
                      <Route path={"userOrder"} element={<OrdersById/>}/>
                  </Route>
              </Route>
            <Route path="/404" element={<NotFoundPage/>} />
          	<Route path="*" element={<Navigate to="/404" />} />
            
      </Routes>

    </div>
  );
}

export default App;
