const ScrollToTop = () => {

  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
  };
  
  return (
    <div className='w-full bg-[#37475A] text-white text-center p-3 text-sm hover:bg-[#485769] cursor-pointer transition-all ease-out' onClick={() => scrollToTop()}>
      <p>Back to top</p>
    </div>
  )
}

export default ScrollToTop
