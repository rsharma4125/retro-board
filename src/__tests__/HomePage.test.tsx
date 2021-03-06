import React from 'react';
import {render, RenderResult} from '@testing-library/react';
import HomePage from "../containers/HomePage";
import '../setupTests'
import {MemoryRouter} from 'react-router-dom';
import {createLocation, createMemoryHistory} from 'history'
import {match} from 'react-router'
import {Provider} from "react-redux";
import store from "../redux/store/Store";
import RetroBoard from "../models/RetroBoard";
import User from "../models/User";
import RetroBoardServiceFactory from "../service/RetroBoard/RetroBoardServiceFactory";


const testUser = new User()
testUser.uid = "uid"
testUser.username = "username"
testUser.displayName = "Foo Bar"
testUser.email = "test@example.com"
testUser.idToken = "id_token"

localStorage.setItem(User.USER_INFO, JSON.stringify(testUser))

const path = `/route/:uid/:id`;
const mockedMatch: match<{ uid:string, id: string }> = {
    isExact: false,
    path,
    url: path.replace(':id', '1').replace(":uid", "uid"),
    params: { uid: "uid", id: "1" }
};

describe("HomePage tests", () => {
    
    let homePage: RenderResult
    let routeProps = {
        history: createMemoryHistory(),
        location: createLocation(mockedMatch.url),
        match: mockedMatch
    }

    beforeEach(() => {
        let retroBoardMockService = RetroBoardServiceFactory.getInstance()
        retroBoardMockService.getMyBoards = async () => {
            return [new RetroBoard("testId", "Name", "vslala")]
        }
        homePage = render(<Provider store={store}><MemoryRouter><HomePage {...routeProps} retroBoardService={retroBoardMockService}/></MemoryRouter></Provider>)
    })

    test("it should contain a link to initialize a new RetroDashboard", () => {
        expect(homePage.getByText("Create Retro Board")).toBeInTheDocument()
    })
});

//
// test("it should render home page successfully", () => {
//     let homePage = render(<HomePage columnOneText={homePageModel.columnOneText}
//                                     columnOneWall={homePageModel.columnOneWall}/>)
//     expect(homePage.container.firstChild).toHaveClass("container")
// })
//
// test("it should render a column for `What went well`", () => {
//     let homePage = render(<HomePage columnOneText={homePageModel.columnOneText}
//                                     columnOneWall={homePageModel.columnOneWall}/>)
//     expect(homePage.getByText("What went well")).toBeInTheDocument();
// })
//
// test("it should load the sticky wall with sticky notes", () => {
//     let homePage = render(<HomePage columnOneText={homePageModel.columnOneText}
//                                     columnOneWall={homePageModel.columnOneWall}/>)
//     expect(homePage.getByText("Foo")).toBeInTheDocument()
// })