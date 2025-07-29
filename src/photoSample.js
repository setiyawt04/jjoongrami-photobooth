const data = Array.from({length: 10}, (_,index) => ({
    id: index + 1,
    img: {
        src: `/images/samplePhoto/${index+1}.jpg`,
        alt:`photo-${index+1}`
    }
}))

export default data