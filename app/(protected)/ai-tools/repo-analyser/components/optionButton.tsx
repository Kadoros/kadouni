import { Button } from '@/components/ui/button'
import React from 'react'

interface Props {
    loading:boolean;
    loadingContext:string;
    context:string;

}

const OptionButton = ({loading,loadingContext,context}:Props) => {
  return (
    <Button
    // onClick={handleAnalyze}
    className="p-2 mt-4 rounded-lg h-14 border border-solid border-black hover:bg-blue-200"
    variant={"outline"}
    disabled={loading} // Disable button while loading
  >
    {loading ? loadingContext : context}
  </Button>
  )
}

export default OptionButton
