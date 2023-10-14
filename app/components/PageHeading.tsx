type PageHeadingProps = {
    title: string;
};
  
const PageHeading: React.FC<PageHeadingProps> = ({ title }) => {
    return <h1 className='text-3xl lg:text-4xl xl:text-5xl font-semibold mb-10 mt-7'>{title}</h1>
}

export default PageHeading;
