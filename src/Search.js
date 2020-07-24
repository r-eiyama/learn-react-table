import React from 'react'
import styled from 'styled-components'
import {useTable, useFilters, useGlobalFilter, useAsyncDebounce} from 'react-table'
// A great library for fuzzy filtering/sorting items
import matchSorter from 'match-sorter'

import makeData from './makeData'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

//検索入力フォーム
function GlobalFilter({
                          preGlobalFilteredRows,
                          globalFilter,
                          setGlobalFilter,
                      }) {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter)
//    ここがわからない
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)
    return (
        <span>
      Search:{' '}
            <input
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
                style={{
                    fontSize: '1.1rem',
                    border: '0',
                }}
            />
    </span>
    )
}

// 検索入力欄
function DefaultColumnFilter({
                                 column: {filterValue, preFilteredRows, setFilter},
                             }) {
    const count = preFilteredRows.length

    return (
        <input
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
            }}
            placeholder={`Search ${count} records...`}
        />
    )
}

// セレクトボックス欄
function SelectColumnFilter({
                                column: {filterValue, setFilter, preFilteredRows, id},
                            }) {

}