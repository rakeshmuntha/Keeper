import Notes from "./Notes"

function Home(props) {
    return (
        <div>
            <Notes showalert= {props.showalert}/>
        </div>
    )
}

export default Home