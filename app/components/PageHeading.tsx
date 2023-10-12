type PageHeadingProps = {
    title: string;
};
  
const PageHeading: React.FC<PageHeadingProps> = ({ title }) => {
    return <h1 className='text-3xl lg:text-4xl xl:text-5xl font-semibold mb-10 mt-7 from-[#5EA2EF] to-[#0072F5] bg-clip-text text-transparent bg-gradient-to-b'>{title}</h1>
}

export default PageHeading;
