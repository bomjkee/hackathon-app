import { FC } from "react"
import { MemberList } from "../../types/member"
import { Link } from "../Link/Link";

interface MemberListViewProps {
    memberList: MemberList
}

export const MemberListView: FC<MemberListViewProps> = ({ memberList }) => {
    return (
        <ul>
            {memberList.map((member) => (
                <li key={member.id}>
                    <Link to={`https://t.me/${member.name}`}>@{member.name}</Link>
                    <span>member.role</span>
                </li>
            ))}
        </ul>
    );
}