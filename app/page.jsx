import { Button } from "@/components/ui/button"
import { FiDownload } from "react-icons/fi"

const Home = () => {
  return (
    <section className = "h-full">
      <div className = "containter mx-auto h-full">
        <div className = "flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          
          {/* TEXT + PHOTO */}
          
          <div className = "text-center xl:text-left">
            <span>Game & Software Developer</span>
            <h1 className = "h1">Hello I'm <br /> <span>Maksym Kopychko</span></h1>
          </div>

          <div>photo</div>
        </div>
      </div>
    </section>
  )
}

export default Home