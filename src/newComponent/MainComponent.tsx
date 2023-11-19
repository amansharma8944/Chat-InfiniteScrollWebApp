import { Box, Container, Divider, Paper, Stack, Typography } from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import edit from "../assets/picture/edit.png"
import people from "../assets/picture/img.png"
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import imageEdit from "../assets/picture/image-removebg-preview.png"
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import axios from 'axios';
import "./MainComponent.css"

interface Item {
    id: string;
    message: string;
    sender: Sender;
    time: string; // or Date if you convert the string to a Date object
  }
  
  interface Sender {
    image: string;
    is_kyc_verified: boolean;
    self: boolean;
    user_id: string;
  }
export const MainComponent = () => {

    const [items, setItems] = useState<Item[]>([]);
    const [page, setPage] = useState(1);

    const fetchData=async (pageno:number):Promise<Item[]>=>{
        try {
            const response = await axios.get(`https://qa.corider.in/assignment/chat?page=${pageno}`);
            const chats: Item[] = response.data.chats;
          
            return chats;
          } catch (err) {
            // Handle or rethrow the error as appropriate
           
            throw err;

          }
   
 
   
 }

    const fetchMoreData=async ()=>{

        try {
            // Assume fetchData is a function that takes a page number
            // and returns a list of items
            console.log(page)
            const newItems:Item[] = await fetchData(page);
            localStorage.setItem(`users`,JSON.stringify(newItems))
            setItems(prevItems => [...prevItems, ...newItems]);
            setPage(prevPage => prevPage + 1);
            console.log("lineno 58  fetchmore")
          
          } catch (error) {
            const  data=localStorage.getItem("users");
            if (data) {
                const parsedData: Item[] = JSON.parse(data);
                setItems(prevItems => [...prevItems, ...parsedData]);
                console.log("data available");
            } else {
                // Handle the case where there is no data in localStorage
                console.error('No cached data available:', error);
            }
          }

    }



    useEffect( () =>  {
        console.log("useeffect");
         axios.get(`https://qa.corider.in/assignment/chat?page=1`)
         .then((response)=>{
             
             const chats: Item[] = response.data.chats;
             localStorage.setItem(`users`,JSON.stringify(chats))
             setItems(chats)
             setPage(prevPage => prevPage + 1)
         })
         .catch(err=>{
            const  data=localStorage.getItem("users");
            if (data) {
                const parsedData: Item[] = JSON.parse(data);
                setItems(prevItems => [...prevItems, ...parsedData]);
                console.log("data available");
            } else {
                // Handle the case where there is no data in localStorage
                console.error('No cached data available:', err);
            }
         })


        
     
       
    }, [])
    
    return (
        <Paper sx={{ width: "100vw", height: "100vh", backgroundColor: "#e3e3e3" }}>
            <Stack sx={{ padding: "5px 25px" }}>
                <Box component={"div"} sx={{ display: "flex", justifyContent: "space-between" }} >
                    <Box sx={{ display: "flex" }}>
                        <KeyboardBackspaceIcon sx={{
                            height: "51px", width: "63px", marginRight: "10px",

                        }} />
                        <Typography sx={{
                            fontWeight: " 600",
                            fontSize: "24px",
                            lineHeight: "50px",
                            letterSpacing: "3px"
                        }}>
                            Trip 1
                        </Typography>

                    </Box>
                    <Box>
                        <img src={edit}  className="w-[50px]" alt='edit' />
                    </Box>

                </Box>

            </Stack>

            <Stack component="header" sx={{ padding: "5px 25px", display: "flex",flexDirection:"row", justifyContent: "space-between" ,alignItems:"center"}} >
                <Box sx={{ display: "flex" }}>
                    <img src={people} className='w-[62px]' alt="dp" />
                    <Box sx={{ marginLeft: "15px" }}>
                        <Typography sx={{ fontSize: "20px", color: "grey" }}>
                            From   <Typography component="h1" variant='h4' sx={{ display: "inline-block", fontSize: "21px", color: "black", fontWeight: "600" }}> IGI Airport, T3</Typography>
                        </Typography>

                        <Typography sx={{ fontSize: "20px", color: "grey" }}>
                            from   <Typography component="h1" variant='h4' sx={{ display: "inline-block", fontSize: "21px", color: "black", fontWeight: "600" }}> Sector 28 </Typography>
                        </Typography>



                    </Box>
                </Box>
                <Box>
                    <MoreVertIcon />
                </Box>

            </Stack>
            <Divider sx={{width:"100vw",margin:"5px 0px 10px 0px"}}/>

            <Stack className="h-[85vh] sm:h-[75vh]" sx={{display:"flex",padding: "5px 25px",flexDirection:"column",paddingBottom:"25px",position:"relative"}}>
                {/* <Box sx={{display:"flex",margin:"20px 0px"}}>
                    <img src={people} alt="img" width={"50px"} height="50px" />
                    <Container sx={{background:"white",marginLeft:"33px",borderRadius:"0px 10px 10px 10px",padding:"19px"}}>
                        <Box>
                            <Typography sx={{color:"#606060",fontSize:"17px"}}>
                                hello lorem20
                            </Typography>
                        </Box>
                    </Container>

                    
                </Box>
                <Box sx={{display:"flex",flexDirection:"row-reverse"}}>
                    <Container sx={{background:"white",marginLeft:"33px",borderRadius:"10px 10px 0px 10px",padding:"19px",marginRight:"0px",backgroundColor:"#1c63d5"}}>
                        <Box>
                            <Typography sx={{color:"white" ,fontSize:"17px"}}>
                                hello
                            </Typography>
                        </Box>
                    </Container>

                    
                </Box>
               */}
  

  <div id="scrollableDiv"
  className="overflow-y-auto custom-scrollbar-hide"
  style={{
          height: "100%",
          overflow: "auto",
          display: "flex",
          flexDirection: "column-reverse"
          ,
          paddingBottom:"25px",
          scrollbarWidth:"none",
        }}>

          <InfiniteScroll
            dataLength={items.length}
            next={fetchMoreData}
            style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
            inverse={true} //
            hasMore={true}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollableDiv"
            // below props only if you need pull down functionality
            refreshFunction={fetchMoreData}
            pullDownToRefresh
            pullDownToRefreshThreshold={50}
            pullDownToRefreshContent={
              <h3 style={{ textAlign: 'center' }}>&#8595;</h3>
            }
            releaseToRefreshContent={
              <h3 style={{ textAlign: 'center' }}>&#8593;</h3>
            }
          >



            {items.map((data,i)=>{
                return(
                    <>
                     {i%2===0?<Box sx={{display:"flex",margin:"20px 0px",paddingRight:"21px"}}>
                    <img src={data.sender.image} className="w-[50px] h-[50px] rounded-full" alt="img"   />
                    <Container sx={{background:"white",marginLeft:"33px",borderRadius:"0px 10px 10px 10px",padding:"19px",}}>
                        <Box>
                            <Typography sx={{color:"#606060",fontSize:"17px"}}>
                              {
                                    data.message
                              }
                            </Typography>
                        </Box>
                    </Container>

                    
                </Box>
                :
                <Box sx={{display:"flex",flexDirection:"row-reverse"}}>
                    <Container sx={{background:"white",marginLeft:"33px",borderRadius:"10px 10px 0px 10px",padding:"19px",marginRight:"0px",backgroundColor:"#1c63d5"}}>
                        <Box>
                            <Typography sx={{color:"white" ,fontSize:"17px"}}>
                                {
                                    data.message
                                }
                            </Typography>
                        </Box>
                    </Container>

                    
                </Box>}
                    </>

                )
            })}
        
          </InfiniteScroll>
        </div>

        <Stack sx={{padding:"0px 25px", background:"white", height:"10vh",marginTop:"0px",display:"flex",flexDirection:"row",alignItems:"center",borderRadius:"15px 15px 15px 15px" ,position:"sticky" , bottom:"0px"}}>

<input type="text" placeholder='send'  className="md:!border !border-[1px] md:mr-[20px]  border outline-none hover:border-transparent" style={{height:"60%",width:"90%",border:"0px "}} />
<SendIcon  sx={{height:"59px",width:"37px",marginRight:"9px"}}/>
<AttachFileIcon sx={{height:"59px",width:"37px"}}/>

</Stack>


            </Stack>


          

         

        </Paper>
    )
}
