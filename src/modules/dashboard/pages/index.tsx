import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  BellOutlined,
  ClusterOutlined,
  FileTextOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Card, Col, List, Progress, Row, Statistic, Tag, Typography } from 'antd';

/**
 * 仪表盘
 *
 * 登录后的默认首页，展示核心指标概览与近期动态。
 * 当前为静态演示数据，接入业务接口后替换即可。
 */
const stats = [
  { title: '用户总数', value: 8846, icon: <UserOutlined />, trend: 12.5, up: true },
  { title: '在线会话', value: 312, icon: <ClusterOutlined />, trend: 3.2, up: true },
  { title: '待办任务', value: 27, icon: <FileTextOutlined />, trend: 8.1, up: false },
  { title: '未读消息', value: 5, icon: <BellOutlined />, trend: 1.4, up: true },
];

const activities = [
  { title: '系统完成了一次自动巡检', time: '2 分钟前', tag: '系统' },
  { title: '用户 admin 更新了角色权限', time: '18 分钟前', tag: '权限' },
  { title: '新增工作流「请假审批」', time: '1 小时前', tag: '流程' },
  { title: '消息中心推送了一条公告', time: '今天 09:30', tag: '消息' },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Typography.Title level={4} className="!mb-1">
          仪表盘
        </Typography.Title>
        <Typography.Text type="secondary">欢迎回来，这里是系统运行概览。</Typography.Text>
      </div>

      <Row gutter={[16, 16]}>
        {stats.map((item) => (
          <Col key={item.title} xs={24} sm={12} xl={6}>
            <Card>
              <Statistic
                title={item.title}
                value={item.value}
                prefix={item.icon}
                valueStyle={{ fontWeight: 600 }}
              />
              <div className="mt-2 flex items-center gap-1 text-xs">
                <span style={{ color: item.up ? '#3f8600' : '#cf1322' }}>
                  {item.up ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {item.trend}%
                </span>
                <span className="text-[var(--ant-color-text-tertiary,#999)]">较上周</span>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <Card title="近期动态">
            <List
              dataSource={activities}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta title={item.title} description={item.time} />
                  <Tag color="processing">{item.tag}</Tag>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card title="资源使用">
            <div className="flex flex-col gap-4">
              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span>CPU</span>
                  <span>62%</span>
                </div>
                <Progress percent={62} status="active" />
              </div>
              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span>内存</span>
                  <span>48%</span>
                </div>
                <Progress percent={48} status="active" strokeColor="#52c41a" />
              </div>
              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span>磁盘</span>
                  <span>81%</span>
                </div>
                <Progress percent={81} status="exception" />
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
