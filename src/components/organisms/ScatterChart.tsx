import React, { useContext, useEffect, useRef, useState } from 'react';
import ItemContext from '../../contexts/ItemContext';
import * as d3 from 'd3';
import { color } from '../../common/color';
import styled from 'styled-components';
import AreaLabel from '../atoms/AreaLabel';
import { Item } from '../../common/model';

const ChartContainer = styled.div`
  position: relative;
`;

const ChartContainer2 = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 400px;
  width: 400px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 5px;
  z-index: -1;
`;

const XAxisText = styled.p`
  position: absolute;
  bottom: -30px;
  font-size: 12px;
`;

const YAxisText = styled.p`
  position: absolute;
  bottom: 3px;
  left: -33px;
  font-size: 12px;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
`;

const AreaLabelContainerTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 200px;
  height: 190px;
`;

const AreaLabelContainerBottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  width: 200px;
  height: 190px;
`;

const ScatterChart = () => {
  const { items } = useContext(ItemContext);
  const chartEl = useRef(null);

  const [itemsLength, setItemsLength] = useState(0);

  useEffect(() => {
    const svg = d3.select(chartEl.current).append('svg').attr('width', 400).attr('height', 400);

    svg
      .append('line')
      .attr('x1', 200)
      .attr('y1', 0)
      .attr('x2', 200)
      .attr('y2', 400)
      .style('stroke', color.LIGHT_GREY);

    svg
      .append('line')
      .attr('x1', 0)
      .attr('y1', 200)
      .attr('x2', 400)
      .attr('y2', 200)
      .style('stroke', color.LIGHT_GREY);

    svg
      .append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', 0)
      .attr('y2', 400)
      .style('stroke', 'black');

    svg
      .append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', 400)
      .attr('y2', 0)
      .attr('stroke-width', 3)
      .style('stroke', 'black');

    svg
      .append('line')
      .attr('x1', 400)
      .attr('y1', 0)
      .attr('x2', 400)
      .attr('y2', 400)
      .attr('stroke-width', 3)
      .style('stroke', 'black');

    svg
      .append('line')
      .attr('x1', 400)
      .attr('y1', 400)
      .attr('x2', 0)
      .attr('y2', 400)
      .attr('stroke-width', 3)
      .style('stroke', 'black');

    svg
      .append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', 0)
      .attr('y2', 400)
      .attr('stroke-width', 3)
      .style('stroke', 'black');
  }, []);

  useEffect(() => {
    console.log('items', items);
    const x = d3.scaleLinear().domain([0, 100]).range([0, 400]);
    const y = d3.scaleLinear().domain([0, 100]).range([400, 0]);

    const svg = d3.select('svg');

    const dots = svg.selectAll('.dot').data(items, (d: Item) => d.index);
    const labels = svg.selectAll('.label').data(items, (d: Item) => d.index);

    if (items.length !== itemsLength) {
      const tempDots = dots
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('cx', (d) => x(d.vision))
        .attr('cy', (d) => y(d.ability))
        .attr('r', 0);

      tempDots.transition().duration(1000).attr('r', 7).attr('fill', color.DARK_BLUE);
      tempDots.on('mouseover', () => {
        d3.select(this).style('cursor', 'move');
      });

      labels
        .enter()
        .append('text')
        .attr('class', 'label')
        .attr('x', (d) => x(d.vision))
        .attr('y', (d) => y(d.ability))
        .attr('dx', '10px')
        .attr('dy', '15px')
        .attr('font-size', '12px')
        .attr('fill', color.DARK_BLUE)
        .text((d) => d.label);

      labels.exit().remove();
      dots.exit().transition().attr('r', 0).remove();

      setItemsLength(items.length);
    } else {
      dots
        .transition()
        .duration(1000)
        .attr('cx', (d) => x(d.vision))
        .attr('cy', (d) => y(d.ability))
        .attr('r', 7)
        .attr('fill', color.DARK_BLUE);

      labels
        .transition()
        .duration(1000)
        .attr('x', (d) => x(d.vision))
        .attr('y', (d) => y(d.ability))
        .attr('dx', '10px')
        .attr('dy', '15px')
        .text((d) => d.label);
    }
  }, [items]);

  return (
    <ChartContainer ref={chartEl}>
      <ChartContainer2>
        <AreaLabelContainerTop>
          <AreaLabel label="Challengers" />
        </AreaLabelContainerTop>
        <AreaLabelContainerTop>
          <AreaLabel label="Leaders" />
        </AreaLabelContainerTop>
        <AreaLabelContainerBottom>
          <AreaLabel label="Niche Players" />
        </AreaLabelContainerBottom>
        <AreaLabelContainerBottom>
          <AreaLabel label="Visionaries" />
        </AreaLabelContainerBottom>
      </ChartContainer2>
      <XAxisText>Completeness of vision →</XAxisText>
      <YAxisText>Ability to execute →</YAxisText>
    </ChartContainer>
  );
};

export default ScatterChart;
