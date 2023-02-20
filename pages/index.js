import Link from 'next/link';
import Image from 'next/image';
import { Flex, Box, Text, Button } from '@chakra-ui/react';
import { baseUrl, fetchAPI } from '../utils/fetchAPI';
import Property from '../components/Property';

const Banner = ({ purpose, title1, title2, desc1, desc2, buttonText, linkName, imageUrl }) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
    <Image src={imageUrl} width={500} height={300} alt ="banner for GharDekho" />
    <Box p="5">
  <Text color="blue.500" fontSize="sm" fontWeight="medium">{purpose}</Text>
  <Text fontSize="3xl" fontWeight="bold" color="blue.700">{title1}<br />{title2}</Text>
  <Text fontSize="lg" paddingTop="3" paddingBottom="3" color="blue.600">{desc1}<br/>{desc2}</Text>
  <Button fontSize="xl">
  <Link href={linkName}>{buttonText}</Link>
  </Button>
  </Box>
  </Flex>
)

export default function Home({propertiesForSale, propertiesForRent}) {
  return (
    <Box>
      <Banner 
        purpose="RENT A HOME"
        title1="Rental homes for"
        title2="Everyone"
        desc1="Explore appartments, villas, homes"
        desc2="and more..."
        buttonText='Explore Renting'
        linkName='/search?purpose=for-rent'
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'
      />
      <Flex flexWrap="wrap">
             {propertiesForRent.slice(0,5).map((property) => <Property property={property} key={property.id} />)}
      </Flex>
      <Banner 
        purpose="BUY A HOME"
        title1="Find, Buy & Own your"
        title2="Dream Home"
        desc1="Explore appartments, villas, homes"
        desc2="and more..."
        buttonText='Explore Buying'
        linkName='/search?purpose=for-sale'
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'
      />
      <Flex flexWrap="wrap">
        {propertiesForSale.slice(0,5).map((property) => <Property property={property} key={property.id} />)}
      </Flex>    
    </Box>
  )
}


export async function getStaticProps() {
  const propertyForSale = await fetchAPI(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsperage=6`)
  const propertyForRent = await fetchAPI(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsperage=6`)

  return{
    props:{
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    }
  }
}