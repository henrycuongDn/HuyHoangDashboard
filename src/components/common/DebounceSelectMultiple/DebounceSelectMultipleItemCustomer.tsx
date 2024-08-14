import { Flex, Select, Spin } from 'antd';
import { SelectProps } from 'antd/es/select/index';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
import pharmacyModule from "~/modules/pharmacy";
import { DSM_getOptions } from './DebounceSelectMultiple.service';
import useDebounceSelectMultipleStore from './DebounceSelectMultipleProvider';

interface propsType extends SelectProps {
    refCollection : "pharma_profile" | "partner";
}
export default function DebounceSelectMultipleItemCustomer({refCollection,...props}:propsType) : React.JSX.Element {
    const {DSM_setting} = useDebounceSelectMultipleStore();
    const [dataSource,setDataSource] = useState<any[]>([]);
    const [loading,setLoading] = useState(false);

    // Init Data Source From Store
    useEffect(() => {
        setDataSource(DSM_setting.dataSource[refCollection]);
    },[DSM_setting]);

    // Handle Fetch Search
    const fetcher = async (keyword : string = "") => {
        try {
            
            if(!keyword) { // Clear Will Return Data Source Root
                setDataSource(DSM_setting.dataSource[refCollection]);
                return;
            };
            setLoading(true);
            const dataFetcher = await pharmacyModule.api.searchV2({
                customerType  : refCollection,
                keyword,
            });
            const data = DSM_getOptions(dataFetcher);
            // Search Will Set DataSource Search
            setDataSource(data);
            setLoading(false);
            
        } catch (error) {
            console.log(error,'error');
            setLoading(false);
        }
    };
    const debounceFetcher = debounce(fetcher,500);
    
    const dataSourceDisabled = dataSource?.map((item) => ({
      ...item,
      disabled: DSM_setting.values[refCollection]?.includes(item?.value)  && item?.value !== props.value,
    }));

    return (
        <Select 
        options={dataSourceDisabled}
        allowClear
        showSearch
        {...loading && {dropdownRender : () => <Flex justify={'center'} align="center" style={{width : '100%',height : 200}}>
            <Spin />
        </Flex>}}
        onSearch={debounceFetcher}
        filterOption={() => true}
        {...props}
        />
    )
}